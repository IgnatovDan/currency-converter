import { createApp } from 'vue'
import App from './app.vue'

import DemoRatesSource from './api/exchange-sources/demo/demo-rates-source.js';
import CbrRatesSource from './api/exchange-sources/cbr/cbr-rates-source.js';
import WebApiProxyRatesSource from './api/exchange-sources/web-api-proxy/web-api-proxy-rates-source.js';
import WebApiJsonRatesSource from './api/exchange-sources/web-api-json/web-api-json-rates-source.js';
import rateSourcesManager from './api/exchange-sources/exchange-sources-manager.js';

rateSourcesManager.registerSource('demo', new DemoRatesSource(), 'Демо данные');
rateSourcesManager.registerSource('cbr', new CbrRatesSource(), 'Сайт Банка России');
rateSourcesManager.registerSource('web-api-proxy', new CbrRatesSource(WebApiProxyRatesSource.Url), 'Proxy - Локальный сайт, данные с сайта Банка России без изменений');
rateSourcesManager.registerSource('web-api-json', new WebApiJsonRatesSource(), 'JSON - Локальный сайт, данные с сайта Банка России в формате json');

createApp(App).mount('#app')
