import 'angular-aria';
import 'angular-animate';
import 'angular-material';
import 'angular-material/angular-material.css';
import './services/api';
import modules from 'ui/modules';

modules
  .get('app/elastalert', ['ngMaterial'])
  .controller('elastalertRootController', function ($scope, $location) {
  })
  .config(function ($mdThemingProvider, $mdIconProvider) {
    $mdThemingProvider.theme('default')
      .primaryPalette('red')
      .accentPalette('amber');

    /*$mdIconProvider
      .iconSet('social', 'img/icons/sets/social-icons.svg', 24)
      .defaultIconSet('img/icons/sets/core-icons.svg', 24);*/
  });
