import { ExchangeRates, Currency } from '../../../components/converter/converter-model-data-objects.js'; // TODO: move into this folder ?

export default class DemoRatesSource {
  static Rates = new ExchangeRates(Date.now, [Currency.RUB(), Currency.USD(), Currency.GBP()]);
  async getRates() {
    return new ExchangeRates(Date.now, [Currency.RUB(), Currency.USD(), Currency.GBP()]);
  }
}
