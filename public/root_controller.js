import 'angular-aria';
import 'angular-animate';
import 'angular-material/angular-material.min.js';
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
  });
