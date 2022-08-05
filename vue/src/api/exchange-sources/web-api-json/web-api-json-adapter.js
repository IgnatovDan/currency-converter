import { Currency, ExchangeRates } from '../exchange-rates-data-objects.js';

async function LoadCurrencyExchangeRates(url) {
  return fetch(url)
    .then(response => {
      return response.json();
    })
    .then(jsonRootObject => {
      const currencies = jsonRootObject.Items?.map(valute =>
        new Currency(
          valute.Name,
          valute.CharCode,
          parseFloat(valute.Value)
        )
      );
      return new ExchangeRates(
        jsonRootObject.Date,
        currencies
      );
    });
}

export {
  LoadCurrencyExchangeRates
}
