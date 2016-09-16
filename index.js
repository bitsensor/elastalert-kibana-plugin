import schema from './server/config/schema';
import ElastalertPluginServer from './server';

export default function (kibana) {
  return new kibana.Plugin({
    id: 'elastalert',
    uiExports: {
      app: {
        title: 'ElastAlert',
        description: 'This is a Kibana plugin for the alerting system ElastAlert.',
        main: 'plugins/elastalert/elastalert',
        injectVars: function (server, options) {
          return options;
        }
      }
    },
    config: schema,
    init: function (server, options) {
      let pluginServer = new ElastalertPluginServer(server, options);
      pluginServer.start();
    }
  });
};
