import chrome from 'ui/chrome';
import html from './index.html';
import './less/app.less';
import './controllers/root_controller';
import './sections';

chrome
    .setBrand({
        logo: 'url(/plugins/elastalert/img/elastalert-logo-kibana.png) center no-repeat'
    })
    .setNavBackground('#212121')
    .addApplicationClass('elastalert-app')
    .setRootTemplate(html)
    .setRootController('elastalert', 'elastalertRootController')
    .setTabDefaults({
        resetWhenActive: true,
        lastUrlStore: window.sessionStore,
        activeIndicatorColor: '#D14F4E'
    })
    .setTabs([
        {
            id: 'overview',
            title: 'Overview'
        }, {
            id: 'settings',
            title: 'Settings'
        }
    ]);
