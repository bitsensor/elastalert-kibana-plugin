import chrome from 'ui/chrome';
import routes from 'ui/routes';
import 'ui/autoload/styles';
import html from './index.html';
import './root_controller';
import './less/app.less';
import './sections';

routes.enable();
routes.otherwise({
  redirectTo: '/rules'
});

chrome
  .setRootTemplate(html)
  .setRootController('elastalert', 'elastalertRootController');
