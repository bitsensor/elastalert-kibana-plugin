export default function (kibana) {
  return new kibana.Plugin({
    uiExports: {
      app: {
        title: 'ElastAlert',
        description: 'This is a Kibana plugin for the alerting system ElastAlert.',
        main: 'plugins/elastalert/elastalert',
        injectVars: function (server, options) {
          return options;
        }
      }
    }
  });
};
