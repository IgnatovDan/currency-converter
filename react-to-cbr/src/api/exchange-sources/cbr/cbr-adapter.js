import { Currency, ExchangeRates } from '../exchange-rates-data-objects.js';

export default async function LoadCurrencyExchangeRates(url) {
  return fetch(url || "https://www.cbr.ru/scripts/XML_daily.asp")
    .then(response => response.arrayBuffer())
    .then(buffer => {
      const decoder = new TextDecoder('windows-1251'); // The 'windows-1251' value is passed in xml, hope it will not be changed
      const xmlString = decoder.decode(buffer);

      var parser = new DOMParser();
      var xmlDoc = parser.parseFromString(xmlString, "text/xml");
      var valuteElements = xmlDoc.getElementsByTagName("Valute");
      const currencies = Array.from(valuteElements).map(valute =>
        new Currency(
          valute.getElementsByTagName('Name')[0].textContent,
          valute.getElementsByTagName('CharCode')[0].textContent,
          // hope the decimal separator will not be changed
          parseFloat(valute.getElementsByTagName('Value')[0].textContent.replace(',', "."))
        )
      );
      if (!currencies.find(item => item.CharCode === 'RUB')) {
        currencies.unshift(Currency.RUB());
      }
      const exchangeDate = xmlDoc.getElementsByTagName("ValCurs")[0].getAttribute('Date'); // TODO: parse to 'Date'
      return Promise.resolve(new ExchangeRates(exchangeDate, currencies));
    });
}
