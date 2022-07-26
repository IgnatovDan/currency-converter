async function LoadExchangeRates() {
  /*
    Access to fetch at 'https://www.cbr.ru/scripts/XML_daily.asp' from origin 'null' has been blocked by CORS policy:
    No 'Access-Control-Allow-Origin' header is present on the requested resource.
    If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.

    https://stackoverflow.com/questions/20035101/why-does-my-javascript-code-receive-a-no-access-control-allow-origin-header-i
    https://developer.chrome.com/blog/referrer-policy-new-chrome-default
    
    https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
    https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
    https://developer.mozilla.org/en-US/docs/Web/API/fetch
    https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Origin
    https://developer.mozilla.org/en-US/docs/Web/API/Request/mode#value

    https://developer.mozilla.org/ru/docs/Web/API/Request/mode - mode: 'no-cors' - rtfm: "empty"
  */

  //
  // https://stackoverflow.com/questions/3102819/disable-same-origin-policy-in-chrome
  // "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --args --disable-web-security --user-data-dir="c:\temp"
  //

  return fetch('https://www.cbr.ru/scripts/XML_daily.asp')
    // .then(response => response.text()) - 'The response is always decoded using UTF-8.' - https://developer.mozilla.org/en-US/docs/Web/API/Response/text
    .then(response => response.arrayBuffer())
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
      if (!currencies.find(item => item.CharCode === 'RUB')) {
        currencies.unshift(Currency.RUB());
      }
      return new ExchangeRates(xmlDoc.getElementsByTagName("ValCurs")[0].getAttribute('Date'), currencies);
    });

  /*
  // mock values:
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
  */
}
