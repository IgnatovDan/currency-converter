import { ExchangeRates, Currency } from '../../model/model-data-objects.js';

//
// Spike: https://github.com/IgnatovDan/Sandbox/blob/main/VanillaJS/cbr-currency-converter/cbr-adapter.js
//
async function CbrAdapterLoadExchangeRates(url) {
  return fetch(url)
    .then(response => {
      return response.arrayBuffer();
    })
    .then(buffer => {
      const decoder = new TextDecoder('windows-1251'); // passed in xml, hope it will not be changed
      const text = decoder.decode(buffer);

      var parser = new DOMParser();
      var xmlDoc = parser.parseFromString(text, "text/xml");
      var valuteElements = xmlDoc.getElementsByTagName("Valute");
      const currencies = Array.from(valuteElements).map(valute =>
        new Currency(
          valute.getElementsByTagName('Name')[0].textContent,
          valute.getElementsByTagName('CharCode')[0].textContent,
          // hope the decimal separator will not be changed
          parseFloat(valute.getElementsByTagName('Value')[0].textContent.replace(',', "."))
        )
      );
      const exchangeDate = xmlDoc.getElementsByTagName("ValCurs")[0].getAttribute('Date'); // TODO: parse to 'Date'
      return new ExchangeRates(exchangeDate, currencies);
    });
}

export { CbrAdapterLoadExchangeRates }
