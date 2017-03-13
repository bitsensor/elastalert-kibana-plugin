import modules from 'ui/modules';
import routes from 'ui/routes';
import html from './rules.html';
import './rules.less';

modules
  .get('app/elastalert')
  .controller('elastalertRulesController', function ($scope, $location, $mdToast, $mdDialog, api) {
    const STATE_IDLE = 'idle';
    const STATE_LOADING = 'loading';
    const STATE_FINISHED = 'finished';
    const STATE_ERROR = 'error';

    function loadRules() {
      $scope.state = STATE_LOADING;
      api({
        method: 'GET',
        url: 'rules'
      }).then(function (result) {
        let index = result.data;

        if (index && index.rules) {
          $scope.rules = index.rules;
          $scope.state = STATE_FINISHED;
        } else {
          $scope.state = STATE_ERROR;
        }
      }).catch(function (error) {
        $scope.state = STATE_ERROR;
      });
    }

    function deleteRules(event, rules) {
      confirmDeleteDialog(event, rules)
        .then(function () {
          let deleteStack = rules.slice();

          rules.forEach(function (rule) {
            api({
              method: 'DELETE',
              url: `rules/${rule}`
            }).then(function () {
              let index = deleteStack.indexOf(rule);
              deleteStack.splice(index, 1);

              if (deleteStack.length === 0) {
                showDeleteToast(rules);
                loadRules();
              }
            });
          });
        });
    }

    function showDeleteToast(rules) {
      $mdToast.show(
        $mdToast.simple()
          .textContent(`Deleted ${rules.length} rule${rules.length > 1 ? 's' : ''}.`)
          .position('bottom right')
          .action('Close')
          .toastClass('toast-dark-background')
      );
    }

    function confirmDeleteDialog(event, rules) {
      let confirmDialog = $mdDialog.confirm()
        .title('Delete these rules?')
        .textContent(`You are about to delete ${rules.length} rule${rules.length > 1 ? 's' : ''}. Are you sure you want to delete them?`)
        .targetEvent(event)
        .ok('Delete')
        .cancel('Cancel');

      return $mdDialog.show(confirmDialog);
    }

    function selectRule(rule) {
      $scope.selectedRules = [rule];
    }

    function openRuleEditor(rule) {
      $location.url(`editor/rule/${rule}`);
    }

    function newRule() {
      $location.url('editor/new');
    }

    $scope.rules = [];
    $scope.selectedRules = [];
    $scope.state = STATE_IDLE;
    $scope.states = {
      idle: STATE_IDLE,
      loading: STATE_LOADING,
      finished: STATE_FINISHED,
      error: STATE_ERROR
    };

    $scope.loadRules = loadRules;
    $scope.selectRule = selectRule;
    $scope.openRuleEditor = openRuleEditor;
    $scope.deleteRules = deleteRules;
    $scope.newRule = newRule;

    loadRules();
  });

routes.when('/rules', {
  template: html
});
