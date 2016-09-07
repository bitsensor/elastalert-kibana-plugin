import modules from 'ui/modules';
import routes from 'ui/routes';
import html from './index.html';

modules
  .get('app/elastalert')
  .directive('elastalertAppRules', function () {

  });

routes.when('/rules', {
  template: html
});
