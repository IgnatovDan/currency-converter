export default function LoadCurrencyExchangeRates() {
  return fetch('https://www.cbr.ru/scripts/XML_daily.asp')
    .then(response => response.arrayBuffer())
    .then(buffer => {
      const decoder = new TextDecoder('windows-1251'); // The 'windows-1251' value is passed in xml, hope it will not be changed
      return Promise.resolve(decoder.decode(buffer));
    });
}
