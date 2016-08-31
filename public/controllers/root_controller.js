import modules from 'ui/modules';

modules
  .get('app/elastalert')
  .controller('elastalertRootController', function elastalertRootController() {
    this.test = 'Testing controller';
  });
