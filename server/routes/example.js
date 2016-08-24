export default function (server) {

  server.route({
    path: '/api/elast_alert/example',
    method: 'GET',
    handler(req, reply) {
      reply({ time: (new Date()).toISOString() });
    }
  });

};
