import modules from 'ui/modules';
import 'angular-animate';
import 'angular-aria';
import 'angular-material';
import 'angular-material/angular-material.css'

modules
  .get('app/elastalert', ['ngMaterial'], )
  .controller('elastalertRootController', function elastalertRootController() {
    this.test = 'Testing controller';
  });
