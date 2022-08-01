# Currency Converter application
Application allows to select source currency, enter amount, select the target currency and then it will show the target amount.

![image](https://user-images.githubusercontent.com/2094015/181904188-3b9d21e4-552b-41cd-80d9-be7bf7898fac.png)

Applications:

1. **Console c# application**: pass your currency name (USD/EUR/RUB - https://en.wikipedia.org/wiki/ISO_4217), your amount and the target currency name as command line arguments and run it. The application will show new amount (or error message). See the README.MD in its folder for more details.
1. **Browser applications**:
   - uses exchange rates from www.cbr.ru (https://www.cbr.ru/scripts/XML_daily.asp)
   - shows 'loading' spinner on initial data fetching
   - shows error message if fetch was not secceeded and switches to 'demo' exchange rates
   - allows to select source currency, enter amount, select the target currency and then it will show the target amount and rate between source and target currencies.
   - allows to select exchange rates source: www.cbr.ru, XML from my web api (transparent proxy to www.cbr.ru) or JSON from my web api (it reads XML from www.cbr.ru and converts it to JSON).
   - see the README.MD in the corresponding folder for more details.

There are **3 browser applications** with the same look&feel:
1. vanilla-js app
1. react app
1. vue app - I am working on it

#### Schedule:
- start date: 24.07.2022
- total spent time: 7 days * 7h = 49h
- finish date: todo

#### TODO:
- add [Connect to: CBR | My web apy XML | My web apy JSON] toggler to console, vanillajs and react implementations
- add vue app
