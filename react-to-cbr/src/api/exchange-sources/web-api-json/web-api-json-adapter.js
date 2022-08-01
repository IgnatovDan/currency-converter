import { Currency, ExchangeRates } from "../../../components/converter/converter-model-data-objects.js"; // TODO: move to src\api\exchange-sources\exchange-source-data-objects.js ?

export default async function WebApiJsonAdapterLoadExchangeRates(url) {
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
        jsonRootObject.Date,
        currencies
      );
    });
}
