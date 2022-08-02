# Currency Converter application
Application allows to select source currency, enter amount, select the target currency and then it will show the target amount and rate between source and target currencies.

Application:
 - uses exchange rates from www.cbr.ru (https://www.cbr.ru/scripts/XML_daily.asp)
 - shows 'loading' spinner on initial data fetching
 - shows error message if fetch was not secceeded and switches to 'demo' exchange rates

## Used technologies
HTML, JS, semantic, CSS flex/position/margin/padding, BEM, fetch, XML, JSON.
This is a "VanillaJS" application.

## How to avoid "Access to fetch at 'https://www.cbr.ru/scripts/XML_daily.asp' from origin 'null' has been blocked by CORS policy":

Close chrome and run it in this way: "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --args --disable-web-security --user-data-dir="c:\temp"
For more details, see https://stackoverflow.com/questions/3102819/disable-same-origin-policy-in-chrome

#### TODO:
- use modules
- add tests
- add @media to place combobox in line for desktop and in column for mobile resolutions
- add duedate for exchange rates and refresh it automatically without loosing amount/source/target-currency (add a new button 'Test refresh outdated rates')
- show country flag, currency symbol
