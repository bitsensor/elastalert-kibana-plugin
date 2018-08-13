import elastAlertAPI from './server/routes/elastalert';

export default function (kibana) {
  return new kibana.Plugin({
    name: 'elastalert-kibana-plugin',
    uiExports: {
      app: {
        title: 'ElastAlert',
        description: 'A way to create, test and edit ElastAlert rules within Kibana.',
        main: 'plugins/elastalert-kibana-plugin/app'
      }
    },
    config(Joi) {
      return Joi.object({
        enabled: Joi.boolean().default(true),
        serverHost: Joi.string()
          .hostname()
          .default('localhost'),
        serverPort: Joi.number()
          .integer()
          .default(3030),
        serverSsl: Joi.boolean().default(false)
      }).default();
    },
    init(server, options) {
      elastAlertAPI(server, options);
    }
  });
}
