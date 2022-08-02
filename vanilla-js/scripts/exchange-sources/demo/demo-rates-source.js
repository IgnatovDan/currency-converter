import { ExchangeRates, Currency } from '../../model/model-data-objects.js';

class DemoRatesSource {
  static Rates = new ExchangeRates(Date.now, [Currency.RUB(), Currency.USD(), Currency.GBP()]);
  async getRates() {
    return new ExchangeRates(Date.now, [Currency.RUB(), Currency.USD(), Currency.GBP()]);
  }
}

export { DemoRatesSource }
