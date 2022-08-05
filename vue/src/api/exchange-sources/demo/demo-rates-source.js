import { ExchangeRates, Currency } from '../exchange-rates-data-objects.js';

export default class DemoRatesSource {
  async getRates() {
    return new ExchangeRates(Date.now, [Currency.RUB(), Currency.USD(), Currency.GBP()]);
  }
}
