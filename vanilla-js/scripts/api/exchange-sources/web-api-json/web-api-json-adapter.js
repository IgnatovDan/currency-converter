import { ExchangeRates, Currency } from '../../data-objects.js';

async function LoadExchangeRates(url) {
  return fetch(url)
    .then(response => {
      return response.json();
    })
    .then(jsonRootObject => {
      const currencies = jsonRootObject.Items?.map(valute =>
        new Currency(
          valute.Name,
          valute.CharCode,
          Number(valute.Value)
        )
      );
      return new ExchangeRates(
        jsonRootObject.Date /* TODO: parse to date */,
        currencies
      );
    });
}

export { LoadExchangeRates }
