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
