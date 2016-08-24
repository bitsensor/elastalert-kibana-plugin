import moment from 'moment';
import chrome from 'ui/chrome';
import uiModules from 'ui/modules';
import uiRoutes from 'ui/routes';

import 'ui/autoload/styles';
import './less/main.less';
import template from './templates/index.html';

chrome
  .setNavBackground('#222222')
  .setTabs([]);

uiRoutes.enable();
uiRoutes
.when('/', {
  template,
  resolve: {
    currentTime($http) {
      return $http.get('../api/elast_alert/example').then(function (resp) {
        return resp.data.time;
      });
    }
  }
});

uiModules
.get('app/elast_alert', [])
.controller('elastAlertHelloWorld', function ($scope, $route, $interval) {
  $scope.title = 'Elast Alert';
  $scope.description = 'This plugin is Kibana plugin UI for the alerting system ElastAlert.';

  var currentTime = moment($route.current.locals.currentTime);
  $scope.currentTime = currentTime.format('HH:mm:ss');
  var unsubscribe = $interval(function () {
    $scope.currentTime = currentTime.add(1, 'second').format('HH:mm:ss');
  }, 1000);
  $scope.$watch('$destroy', unsubscribe);
});
