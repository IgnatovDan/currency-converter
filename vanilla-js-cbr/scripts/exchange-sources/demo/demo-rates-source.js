class DemoRatesSource {
  static Rates = new ExchangeRates(Date.now, [Currency.RUB(), Currency.USD(), Currency.GBP()]);
  async getRates() {
    return new ExchangeRates(Date.now, [Currency.RUB(), Currency.USD(), Currency.GBP()]);
  }
}
