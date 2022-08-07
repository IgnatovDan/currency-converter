[![Run console tests](https://github.com/IgnatovDan/currency-converter/actions/workflows/console-run-tests.yml/badge.svg)](https://github.com/IgnatovDan/currency-converter/actions/workflows/console-run-tests.yml)

# Currency Converter applications
Applications allow to select source currency, enter amount, select the target currency and then it will show the target amount.

![image](https://user-images.githubusercontent.com/2094015/182308596-46497acc-ed3d-42a2-be04-b643d389ddf9.png)

Applications:

1. **[Console c# application (ASP.NET Core)](https://github.com/IgnatovDan/currency-converter/tree/master/console)**: pass your currency name (USD/EUR/RUB - https://en.wikipedia.org/wiki/ISO_4217), your amount and the target currency name as command line arguments and run it. The application will show a new amount (or an error message). See its [README.MD](https://github.com/IgnatovDan/currency-converter/tree/master/console#readme) for more details.
1. **3 browser applications** with the same look&feel:
   - **[Vanilla-JS application](https://github.com/IgnatovDan/currency-converter/tree/master/vanilla-js)**
   - **[React application](https://github.com/IgnatovDan/currency-converter/tree/master/react)**
   - **[Vue application](https://github.com/IgnatovDan/currency-converter/tree/master/vue)**
   - uses exchange rates from www.cbr.ru (https://www.cbr.ru/scripts/XML_daily.asp)
   - shows 'loading' spinner on initial data fetching
   - shows error message if fetch was not secceeded and switches to 'demo' exchange rates
   - allows to select source currency, enter amount, select the target currency and then it will show the target amount and rate between source and target currencies.
   - allows to select exchange rates source: www.cbr.ru, XML from my web api (transparent proxy to www.cbr.ru) or JSON from my web api (it reads XML from www.cbr.ru and converts it to JSON).
   - see README.MD in each folder for more details.
1. **[Web API for Currency Converter (ASP.NET Core)](https://github.com/IgnatovDan/currency-converter/tree/master/my-web-api)**: provides api to download xml with exchange rates based on data from www.cbr.ru (https://www.cbr.ru/scripts/XML_daily.asp). See its [README.MD](https://github.com/IgnatovDan/currency-converter/tree/master/my-web-api#readme) for more details.

---
### RC1 (done)
#### Planned Timeline:
- start date: 24.07.2022
- estimation: 64h
- finish date: 01.08.2022

#### Actual Timeline:
- start date: 24.07.2022
- total hours: 76h
- finish date: 05.08.2022
---
### Add Tests (in progress)
#### Planned Timeline:
- start date: 07.08.2022
- estimation: 40h
- finish date: 21.08.2022

#### Actual Timeline:
- start date: 07.08.2022
- total hours: ??
- finish date: ??
---
#### TODO:
- add tests - in progress
- other todos in README.MD files in each project
