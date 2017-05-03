import modules from 'ui/modules';
import path from 'path';

modules
  .get('app/elastalert')
  .service('api', function ($http) {
    return function (request) {
      if (request && request.url) {
        request.url = path.join('../api/elastalert', request.url);
      }

      return $http(request);
    };
  });
