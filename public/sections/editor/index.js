import CodeMirror from 'codemirror';
import $ from 'jquery';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/yaml';
import 'codemirror/theme/material.css';
import 'codemirror/addon/scroll/simplescrollbars';
import 'codemirror/addon/scroll/simplescrollbars.css';
import 'angular-ui-codemirror';
import 'angular-hotkeys';
import { uiModules } from 'ui/modules';
import routes from 'ui/routes';
import html from './editor.html';
import './editor.less';

window.CodeMirror = CodeMirror;

uiModules
  .get('app/elastalert', ['ui.codemirror', 'cfp.hotkeys'])
  .directive('full', function () {
    return function ($scope, $element, $attrs) {
      $element.height($(window).height() - $('.header').outerHeight());
    };
  })
  .controller('elastalertEditorController', function ($scope, $location, $routeParams, $interval, $mdToast, $mdDialog, api, hotkeys) {
    const requestStates = {
      STATE_IDLE: 'idle',
      STATE_LOADING: 'loading',
      STATE_FINISHED: 'finished',
      STATE_ERROR: 'error',
    };
    let document;

    function loadRuleContent(id) {
      $scope.state.rule = requestStates.STATE_LOADING;

      api({
        method: 'GET',
        url: `rules/${id}`
      }).then(function (result) {
        let ruleContent = result.data;
        $scope.state.rule = requestStates.STATE_FINISHED;
        $scope.ruleContent = ruleContent;
        $scope.justLoaded = true;
      }).catch(function (error) {
        console.error(error);
        $scope.state.rule = requestStates.STATE_ERROR;
      });
    }

    function loadTemplates() {
      $scope.state.templates = requestStates.STATE_LOADING;

      api({
        method: 'GET',
        url: `templates`
      }).then(function (result) {
        let index = result.data;
        $scope.templates = [];
        $scope.state.templates = requestStates.STATE_FINISHED;
        _.forEach(index.templates, function (template) {
          template = template.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
          $scope.templates.push(template);
        });
        $scope.justLoaded = true;
      }).catch(function (error) {
        console.error(error);
        $scope.state.templates = requestStates.STATE_ERROR;
      });
    }

    function insertTemplate(id) {
      $scope.state.rule = requestStates.STATE_LOADING;
      id = id.replace(/\b\w/g, l => l.toLowerCase()).replace(/ /g, '_');

      api({
        method: 'GET',
        url: `templates/${id}`
      }).then(function (result) {
        let ruleContent = result.data;
        $scope.state.rule = requestStates.STATE_FINISHED;
        $scope.ruleContent = ruleContent;
        $scope.justLoaded = true;
      }).catch(function (error) {
        console.error(error);
        $scope.state.rule = requestStates.STATE_ERROR;
      });
    }

    function switchConsoleState(state) {
      if (typeof state === 'undefined') {
        $scope.consoleExpanded = !$scope.consoleExpanded;
      } else {
        $scope.consoleExpanded = state;
      }
    }

    function editorLoaded(editor) {
      document = editor.getDoc();

      document.on('change', function () {
        if ($scope.justLoaded) {
          $scope.justLoaded = false;
        } else {
          $scope.ruleContentEdited = true;
        }
      });
    }

    function backToOverview(event) {
      if ($scope.ruleContentEdited) {
        confirmSaveDialog(event, $scope.ruleName)
          .then(function () {
            goToRules();
          });
      } else {
        goToRules();
      }
    }

    function goToRules() {
      $location.url('rules');
    }

    function confirmSaveDialog(event, id) {
      let confirmDialog = $mdDialog.confirm()
        .title('Continue without saving?')
        .textContent(`You made some changes to '${id}'. When you continue the changes will be lost. Are you sure?`)
        .targetEvent(event)
        .ok('Continue without saving')
        .cancel('Cancel');

      return $mdDialog.show(confirmDialog);
    }

    function getNameDialog() {
      var confirm = $mdDialog.prompt()
        .title('What would you like to name the new rule?')
        .textContent('This name cannot contain spaces or other file system reserved tokens.')
        .placeholder('Rule Name')
        .ariaLabel('Rule Name')
        .ok('Create rule')
        .cancel('Cancel');

      return $mdDialog.show(confirm);
    }

    function testRule(content, options) {
      $scope.state.test = requestStates.STATE_LOADING;
      switchConsoleState(true);

      api({
        method: 'POST',
        url: 'test',
        data: {
          rule: content,
          options: options
        }
      }).then(function (result) {
        $scope.state.test = requestStates.STATE_FINISHED;
        $scope.consoleOutput = result.data;
      }).catch(function (errorResult) {
        console.error(errorResult);
        $scope.consoleOutput = errorResult.data;
        $scope.state.test = requestStates.STATE_ERROR;
      });
    }

    function saveRule(id) {
      $scope.state.save = requestStates.STATE_LOADING;
      $scope.ruleContentEdited = false;

      api({
        method: 'POST',
        url: `rules/${id}`,
        data: {
          yaml: $scope.ruleContent
        }
      }).then(function (result) {
        if (result.data.created) {
          $mdToast.show(
            $mdToast.simple()
              .textContent(`Saved ${id}.`)
              .position('bottom right')
              .action('Close')
              .toastClass('toast-dark-background')
          );

          $scope.state.save = requestStates.STATE_FINISHED;
        }
      }).catch(function (error) {
        console.error(error);

        $mdToast.show(
          $mdToast.simple()
            .textContent(`Error saving ${id}. Try again.`)
            .position('bottom right')
            .action('Close')
            .toastClass('toast-dark-background')
        );
        $scope.ruleContentEdited = true;
        $scope.state.save = requestStates.STATE_ERROR;
      });
    }

    function saveCurrentRule(event) {
      if (event.preventDefault) {
        event.preventDefault();
      }

      saveRule($scope.ruleName);
    }

    $scope.ruleName = $routeParams.id;
    $scope.ruleContent = '';
    $scope.expandConsole = false;
    $scope.ruleContentEdited = false;
    $scope.justLoaded = false;
    $scope.newRule = false;
    $scope.consoleOutput = '';
    $scope.requestStates = requestStates;

    $scope.state = {
      rule: requestStates.STATE_IDLE,
      test: requestStates.STATE_IDLE,
      save: requestStates.STATE_IDLE
    };

    $scope.editorOptions = {
      mode: 'yaml',
      theme: 'material',
      lineNumbers: true,
      scrollbarStyle: 'overlay',
      onLoad: editorLoaded,
      extraKeys: {
        'Ctrl-S': saveCurrentRule
      }
    };

    $scope.switchConsoleState = switchConsoleState;
    $scope.insertTemplate = insertTemplate;
    $scope.saveRule = saveRule;
    $scope.backToOverview = backToOverview;
    $scope.testRule = testRule;

    loadTemplates();

    if ($routeParams.id) {
      loadRuleContent($routeParams.id);
    } else {
      $scope.newRule = true;

      getNameDialog().then(function (ruleName) {
        $scope.ruleName = ruleName;
      }, function () {
        $location.url('rules');
      });
    }

    hotkeys.add({
      combo: 'ctrl+s',
      description: 'Save rule',
      callback: saveCurrentRule
    });

    $scope.$on('$destroy', function () {
      hotkeys.del('ctrl+s');
    });
  });

routes.when('/editor/rule/:id', {
  template: html
});

routes.when('/editor/new', {
  template: html
});

routes.when('/editor', {
  redirectTo: '/rules'
});
