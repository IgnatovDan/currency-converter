# Currency Converter application
Select source currency, enter amount, select the target currency and the application will show the target amount and rate between source and target currencies.

Application uses exchange rates from www.cbr.ru (https://www.cbr.ru/scripts/XML_daily.asp)

## Used technologies
React, HTML, semantic, CSS flex/position/margin/padding, BEM.
This is a React application, project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Available Scripts
- `npm start`
- `npm test`

## How to avoid "Access to fetch at 'https://www.cbr.ru/scripts/XML_daily.asp' from origin 'null' has been blocked by CORS policy":

Close chrome and run it in this way: "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --args --disable-web-security --user-data-dir="c:\temp"
For more details, see https://stackoverflow.com/questions/3102819/disable-same-origin-policy-in-chrome

#### TODO:
- show error message and disable editors if fetch error occurs
- change css management: switch to dynamic unique names (https://create-react-app.dev/docs/adding-a-css-modules-stylesheet/)
- disable converter UI until exchange rates are loaded
- review implementation with redux
