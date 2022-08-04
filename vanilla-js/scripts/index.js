import { rateSourcesManager } from './api/exchange-sources/exchange-sources-manager.js';
import { DemoRatesSource } from './api/exchange-sources/demo/demo-rates-source.js';
import { CbrRatesSource } from './api/exchange-sources/cbr/cbr-rates-source.js';
import { WebApiProxyRatesSource } from './api/exchange-sources/web-api-proxy/web-api-proxy-rates-source.js';
import { WebApiJsonRatesSource } from './api/exchange-sources/web-api-json/web-api-json-rates-source.js';
import { Model } from './model/model.js';
import { ViewBinding } from './ui/view-binding.js';
  
rateSourcesManager.registerSource('demo', new DemoRatesSource());
rateSourcesManager.registerSource('cbr', new CbrRatesSource());
rateSourcesManager.registerSource('web-api-proxy', new CbrRatesSource(WebApiProxyRatesSource.Url));
rateSourcesManager.registerSource('web-api-json', new WebApiJsonRatesSource());

const model = new Model();
model.forceChangeTargetCharCode = 'USD';
model.setExchangeRatesSource('cbr');
  
document.addEventListener("DOMContentLoaded", () => {
  ViewBinding.Bind(model);
});
