import 'angular-aria';
import 'angular-animate';
import 'angular-material';
import 'angular-material/angular-material.css'
import chrome from 'ui/chrome';
import routes from 'ui/routes';
import modules from 'ui/modules';

modules
  .get('app/elastalert', ['ngMaterial'])
  .controller('elastalertRootController', function ($scope, $location) {
    this.$location = $location;
    const tabs = chrome.getTabs();


  })
  .config(function ($mdThemingProvider) {
    $mdThemingProvider.theme('default')
      .primaryPalette('red')
      .accentPalette('amber');
  });
