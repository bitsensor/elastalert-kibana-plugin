import micromatch from 'micromatch';
import boom from 'boom';
import path from 'path';

export default class ElastalertPluginServer {
  constructor(server, options) {
    this._server = server;
    this._options = options;
  }

  start() {
    const self = this;
    let baseUri = `http${this._options.serverSsl ? 's' : ''}://${this._options.serverHost}:${this._options.serverPort}`;

    // Route every proxy request to our proxy
    this._server.route({
      path: '/api/elastalert/{path*}',
      method: ['GET', 'POST', 'DELETE'],
      handler: {
        proxy: {
          mapUri: function (request, callback) {
            if (self._checkEndpointDisabled(request.params.path, request.method)) {
              callback(boom.forbidden('This endpoint was disabled by the plugin.'), null);
            } else {
              callback(null, `${baseUri}/${request.params.path || ''}`);
            }
          }
        }
      }
    });
  }

  _checkEndpointDisabled(endpoint, method) {
    let disabledEndpoints = this._options.disabledEndpoints;
    let invalidPath = micromatch.isMatch;

    function invalidMethod(disabledMethods, method) {
      return disabledMethods.includes('*') || disabledMethods.includes(method.toLowerCase());
    }

    function invalidEndpoint(endpoint, disabledEndpoint) {
      let disabledMethods = [];

      // If the disabled endpoint is only a string, all methods will be blocked
      if (typeof disabledEndpoint === 'string') {
        return invalidPath(endpoint, disabledEndpoint);
      } else {
        if (typeof disabledEndpoint.method === 'string') {
          disabledMethods.push(disabledEndpoint.method);
        } else {
          disabledMethods = disabledEndpoint.method;
        }
      }

      disabledMethods.map(function (disabledMethod) {
        return disabledMethod.toLowerCase();
      });

      return invalidMethod(disabledMethods, method) && invalidPath(endpoint, disabledEndpoint.path);
    }

    for (let i = 0; i < disabledEndpoints.length; i++) {
      let disabledEndpoint = disabledEndpoints[i];

      if (invalidEndpoint(endpoint, disabledEndpoint)) {
        return true;
      }
    }

    return false;
  }
}
