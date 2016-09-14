import modules from 'ui/modules';
import routes from 'ui/routes';
import html from './rules.html';
import './rules.less';

modules
  .get('app/elastalert')
  .controller('elastalertRulesController', function ($scope, $location, api) {
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

    function selectRule(rule) {
      $scope.selectedRules = [rule];
    }

    function openRuleEditor(rule) {
      $location.url(`editor/rule/${rule}`);
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

    loadRules();
  });

routes.when('/rules', {
  template: html
});
