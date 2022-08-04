import { LoadExchangeRates} from './cbr-adapter.js';
  
class CbrRatesSource {
  #url;
  constructor(url) {
    this.#url = url || "https://www.cbr.ru/scripts/XML_daily.asp";
  }
  async getRates() {
    return LoadExchangeRates(this.#url);
  }
}

export { CbrRatesSource }
