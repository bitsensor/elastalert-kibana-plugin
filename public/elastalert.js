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
  .setRootTemplate(html)
  .setRootController('elastalert', 'elastalertRootController');
