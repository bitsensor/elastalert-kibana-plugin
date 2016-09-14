import CodeMirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/yaml';
import 'codemirror/theme/material.css';
import 'angular-ui-codemirror';
import modules from 'ui/modules';
import routes from 'ui/routes';
import html from './editor.html';
import './editor.less';

window.CodeMirror = CodeMirror;

modules
  .get('app/elastalert', ['ui.codemirror'])
  .controller('elastalertEditorController', function ($scope, $routeParams, api) {
    const STATE_IDLE = 'idle';
    const STATE_LOADING = 'loading';
    const STATE_FINISHED = 'finished';
    const STATE_ERROR = 'error';

    function loadRuleContent(id) {
      $scope.state = STATE_LOADING;

      api({
        method: 'GET',
        url: `rules/${id}`
      }).then(function (result) {
        let ruleContent = result.data;
        $scope.state = STATE_FINISHED;
        $scope.ruleContent = ruleContent;
      }).catch(function (error) {
        $scope.state = STATE_ERROR;
      });
    }

    $scope.ruleName = $routeParams.id;
    $scope.ruleContent = '';
    $scope.state = STATE_IDLE;

    $scope.states = {
      idle: STATE_IDLE,
      loading: STATE_LOADING,
      finished: STATE_FINISHED,
      error: STATE_ERROR
    };

    $scope.editorOptions = {
      mode: 'yaml',
      theme: 'material',
      lineNumbers: true
    };

    if ($routeParams.id) {
      loadRuleContent($routeParams.id);
    }
  });

routes.when('/editor/rule/:id', {
  template: html
});

routes.when('/editor', {
  redirectTo: '/rules'
});
