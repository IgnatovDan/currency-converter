async function LoadExchangeRates() {
  // TODO: fetch from cbr
  return new Promise(resolve => {
    resolve(
      new ExchangeRates(
        Date.now(),
        [
          new Currency('Российский рубль', 'RUB', 1),
          new Currency('Американский доллар', 'USD', 57)
        ]
      )
    );
  });
}
