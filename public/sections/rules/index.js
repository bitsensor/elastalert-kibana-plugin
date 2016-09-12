import modules from 'ui/modules';
import routes from 'ui/routes';
import html from './index.html';

modules
  .get('app/elastalert')
  .controller('elastalertRulesController', function ($scope, $http) {});

routes.when('/rules', {
  template: html
});
