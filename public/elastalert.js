import chrome from 'ui/chrome';
import routes from 'ui/routes';
import html from './index.html';
import './root_controller';
import './less/app.less';
import './sections';

const tabs = [
    {
        id: 'rules',
        title: 'Rules'
    }
];

routes.enable();
routes.otherwise({
    redirectTo: '/rules'
});

chrome
    .setBrand({
        logo: 'url(/plugins/elastalert/img/elastalert-logo-kibana.png) center no-repeat'
    })
    .setNavBackground('#212121')
    .addApplicationClass('elastalert-app')
    .setTabDefaults({
        resetWhenActive: true,
        lastUrlStore: window.sessionStore,
        activeIndicatorColor: '#D14F4E'
    })
    .setTabs(tabs)
    .setRootTemplate(html)
    .setRootController('elastalert', 'elastalertRootController');
