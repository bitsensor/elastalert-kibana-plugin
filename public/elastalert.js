import chrome from 'ui/chrome';
import html from './index.html'
import './controllers/root_controller';

chrome
    .setBrand({
        text: 'elastalert'
    })
    .setRootTemplate(html)
    .setRootController('elastalert', 'elastalertRootController');
