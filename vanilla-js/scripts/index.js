import { rateSourcesManager } from './exchange-sources/exchange-sources-manager.js';
import { DemoRatesSource } from './exchange-sources/demo/demo-rates-source.js';
import { CbrRatesSource } from './exchange-sources/cbr/cbr-rates-source.js';
import { WebApiProxyRatesSource } from './exchange-sources/web-api-proxy/web-api-proxy-rates-source.js';
import { WebApiJsonRatesSource } from './exchange-sources/web-api-json/web-api-json-rates-source.js';
import { State } from './model/model.js';
import { ViewModel } from './view-model/view-model.js';
  
rateSourcesManager.registerSource('demo', new DemoRatesSource());
rateSourcesManager.registerSource('cbr', new CbrRatesSource());
rateSourcesManager.registerSource('web-api-proxy', new CbrRatesSource(WebApiProxyRatesSource.Url));
rateSourcesManager.registerSource('web-api-json', new WebApiJsonRatesSource());

// TODO: rateSourcesManager.registerSource('web-api-json');

const state = new State();
state.forceChangeTargetCharCode = 'USD';
state.setExchangeRatesSource('cbr');
  
document.addEventListener("DOMContentLoaded", () => {
  ViewModel.Bind(state);
});
