import { LoadCurrencyExchangeRates } from './cbr-adapter.js';

export default class CbrRatesSource {
  #url;
  constructor(url) {
    this.#url = url || "https://www.cbr.ru/scripts/XML_daily.asp";
  }
  async getRates() {
    return LoadCurrencyExchangeRates(this.#url);
  }
}
