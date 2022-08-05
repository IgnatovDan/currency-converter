# Currency Converter application
Application allows to select source currency, enter amount, select the target currency and then it will show the target amount and rate between source and target currencies.

Application:
 - uses exchange rates from www.cbr.ru (https://www.cbr.ru/scripts/XML_daily.asp)
 - shows 'loading' spinner on initial data fetching
 - shows error message if fetch was not secceeded and switches to 'demo' exchange rates

![image](https://user-images.githubusercontent.com/2094015/182308596-46497acc-ed3d-42a2-be04-b643d389ddf9.png)

## Used technologies
HTML, JS, CSS, BEM, fetch, XML, JSON.
This is a "VanillaJS" application.

## How to avoid "Access to fetch at 'https://www.cbr.ru/scripts/XML_daily.asp' from origin 'null' has been blocked by CORS policy":

Close chrome and run it in this way: "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --args --disable-web-security --user-data-dir="c:\temp"
For more details, see https://stackoverflow.com/questions/3102819/disable-same-origin-policy-in-chrome

For "Access to script at 'file:///C:/Work/GitHub/currency-converter/vanilla-js/scripts/index.js' from origin 'null' has been blocked by CORS policy" use 'Live Server (Five Server)' extension or similar approach: application is build with ES modules and browser blocks module loading when opening an html file.

#### TODO:
- add tests
- add @media to place combobox in line for desktop and in column for mobile screens
- use local server proxy to avoid "blocked by CORS policy" errors
