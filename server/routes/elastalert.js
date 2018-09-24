export default function (server, options) {
  const baseUri = `http${options.serverSsl ? 's' : ''}://${options.serverHost}:${options.serverPort}`;

  // Route every request to the ElastAlert API
  server.route({
    path: '/api/elastalert/{path*}',
    method: ['GET', 'POST', 'DELETE'],
    handler: {
      proxy: {
        mapUri: function (request, callback) {
          callback(null, `${baseUri}/${request.params.path || ''}`);
        }
      }
    }
  });
}
