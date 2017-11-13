import 'angular-aria';
import 'angular-animate';
import 'angular-material/angular-material.min.js';
import 'angular-material/angular-material.css';
import './services/api';
import { uiModules } from 'ui/modules';

uiModules
  .get('app/elastalert', ['ngMaterial'])
  .controller('elastalertRootController', function ($scope, $location) {
  })
  .config(function ($mdThemingProvider, $mdIconProvider) {
    $mdThemingProvider.theme('default')
      .primaryPalette('red')
      .accentPalette('amber');
  });
