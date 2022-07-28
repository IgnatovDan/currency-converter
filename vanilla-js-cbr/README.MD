# Currency Converter application
Select source currency, enter amount, select the target currency and the application will show the target amount and rate between source and target currencies.

Application uses exchange rates from www.cbr.ru (https://www.cbr.ru/scripts/XML_daily.asp)

## Used technologies
HTML, semantic, CSS flex/position/margin/padding, BEM.
This is a "VanillaJS" application

## How to avoid "Access to fetch at 'https://www.cbr.ru/scripts/XML_daily.asp' from origin 'null' has been blocked by CORS policy":

Close chrome and run it in this way: "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --args --disable-web-security --user-data-dir="c:\temp"
For more details, see https://stackoverflow.com/questions/3102819/disable-same-origin-policy-in-chrome

#### TODO:
- show error message and disable editors if fetch error occurs
- store selected values between sessions
- add duedate for exchange rates and refresh it automatically without loosing user data (add a new button 'Test refresh outdated rates')
- add tests
- show country flag, currency symbol
- store received rates and use it if the remove service is not available (add a new button 'Test CBR unavailable mode')
- add @media to place combobox in line for desktop and in column for mobile resolutions
- add 'Loading' indicator + disable editors
