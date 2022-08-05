# Currency Converter application
Application allows to select source currency, enter amount, select the target currency and then it will show the target amount.

![image](https://user-images.githubusercontent.com/2094015/182308596-46497acc-ed3d-42a2-be04-b643d389ddf9.png)

Applications:

1. **Console c# application**: pass your currency name (USD/EUR/RUB - https://en.wikipedia.org/wiki/ISO_4217), your amount and the target currency name as command line arguments and run it. The application will show new amount (or error message). See the README.MD in its folder for more details.
1. **Browser applications**:
   - uses exchange rates from www.cbr.ru (https://www.cbr.ru/scripts/XML_daily.asp)
   - shows 'loading' spinner on initial data fetching
   - shows error message if fetch was not secceeded and switches to 'demo' exchange rates
   - allows to select source currency, enter amount, select the target currency and then it will show the target amount and rate between source and target currencies.
   - allows to select exchange rates source: www.cbr.ru, XML from my web api (transparent proxy to www.cbr.ru) or JSON from my web api (it reads XML from www.cbr.ru and converts it to JSON).
   - see the README.MD in each folder for more details.

There are **3 browser applications** with the same look&feel:
1. vanilla-js app
1. react app
1. vue app

#### Planned Timeline:
- start date: 24.07.2022
- estimation: 64h
- RC1 finish date: 01.08.2022

#### Actual Timeline:
- start date: 24.07.2022
- total hours: 76h
- RC1 finish date: 05.08.2022

#### TODO:
- add tests
- other todos in README.MD files in each project
