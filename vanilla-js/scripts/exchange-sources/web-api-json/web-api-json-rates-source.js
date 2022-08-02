import { WebApiJsonAdapterLoadExchangeRates } from './web-api-json-adapter.js';

class WebApiJsonRatesSource {
  #url;
  constructor(url) {
    this.#url = url || "https://localhost:7271/exchange-rates-utf.json";
  }
  async getRates() {
    return WebApiJsonAdapterLoadExchangeRates(this.#url);
  }
}

export { WebApiJsonRatesSource }
