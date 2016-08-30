import modules from 'ui/modules';

modules
  .get('app/elastalert')
  .controller('elastalertRootController', function elastalertRootController($scope) {
    $scope.test = 'Testing controller';
  });
