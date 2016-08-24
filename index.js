import exampleRoute from './server/routes/example';

export default function (kibana) {
  return new kibana.Plugin({
    require: ['elasticsearch'],

    uiExports: {
      app: {
        title: 'Elast Alert',
        description: 'This plugin is Kibana plugin UI for the alerting system ElastAlert.',
        main: 'plugins/elast_alert/app'
      },
      hacks: [
        'plugins/elast_alert/hack'
      ]
    },

    config(Joi) {
      return Joi.object({
        enabled: Joi.boolean().default(true),
      }).default();
    },

    init(server, options) {
      // Add server routes and initalize the plugin here
      exampleRoute(server);
    }

  });
};
