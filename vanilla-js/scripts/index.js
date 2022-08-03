import { rateSourcesManager } from './exchange-sources/exchange-sources-manager.js';
import { DemoRatesSource } from './exchange-sources/demo/demo-rates-source.js';
import { CbrRatesSource } from './exchange-sources/cbr/cbr-rates-source.js';
import { WebApiProxyRatesSource } from './exchange-sources/web-api-proxy/web-api-proxy-rates-source.js';
import { WebApiJsonRatesSource } from './exchange-sources/web-api-json/web-api-json-rates-source.js';
import { Model } from './model/model.js';
import { ViewBinding } from './view-binding/view-binding.js';
  
rateSourcesManager.registerSource('demo', new DemoRatesSource());
rateSourcesManager.registerSource('cbr', new CbrRatesSource());
rateSourcesManager.registerSource('web-api-proxy', new CbrRatesSource(WebApiProxyRatesSource.Url));
rateSourcesManager.registerSource('web-api-json', new WebApiJsonRatesSource());

// TODO: rateSourcesManager.registerSource('web-api-json');

const model = new Model();
model.forceChangeTargetCharCode = 'USD';
model.setExchangeRatesSource('cbr');
  
document.addEventListener("DOMContentLoaded", () => {
  ViewBinding.Bind(model);
});
