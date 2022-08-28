import { LoadExchangeRates } from './web-api-json-adapter.js';

class WebApiJsonRatesSource {
  #url;
  constructor(url) {
    this.#url = url || "https://localhost:7040/exchange-rates-utf.json";
  }
  async getRates() {
    return LoadExchangeRates(this.#url);
  }
}

export { WebApiJsonRatesSource }
