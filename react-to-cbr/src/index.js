import React from 'react';
import ReactDOM from 'react-dom/client';

//import 'normalize.css';

import './index.css';
import App from './components/app/app';
import reportWebVitals from './reportWebVitals';
import rateSourcesManager from './api/exchange-sources/exchange-sources-manager';
import DemoRatesSource from './api/exchange-sources/demo/demo-rates-source.js';
import CbrRatesSource from './api/exchange-sources/cbr/cbr-rates-source.js';
import WebApiProxyRatesSource from './api/exchange-sources/web-api-proxy/web-api-proxy-rates-source.js';

rateSourcesManager.registerSource('demo', new DemoRatesSource(), 'Демо данные');
rateSourcesManager.registerSource('cbr', new CbrRatesSource(), 'Сайт Банка России');
rateSourcesManager.registerSource('web-api-proxy', new CbrRatesSource(WebApiProxyRatesSource.Url), 'Локальный сайт, данные с сайта Банка России без изменений');


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
