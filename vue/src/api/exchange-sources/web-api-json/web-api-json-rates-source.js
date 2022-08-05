import { LoadCurrencyExchangeRates } from './web-api-json-adapter.js';

export default class WebApiJsonRatesSource {
  #url;
  constructor(url) {
    this.#url = url || "https://localhost:7271/exchange-rates-utf.json";
  }
  async getRates() {
    return LoadCurrencyExchangeRates(this.#url);
  }
}
