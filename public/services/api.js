import { uiModules }  from 'ui/modules';
import path from 'path';

uiModules
  .get('app/elastalert')
  .service('api', function ($http) {
    return function (request) {
      if (request && request.url) {
        request.url = path.join('../api/elastalert', request.url);
      }

      return $http(request);
    };
  });
