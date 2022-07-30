# Currency Converter application
Application allows to select source currency, enter amount, select the target currency and then it will show the target amount.

![image](https://user-images.githubusercontent.com/2094015/181903563-7182016a-4958-4ea2-8338-4628eaa54497.png)

There are two series of application:

1. Applications that perform a request directly to www.cbr.ru
1. Applications that perform a request to my web API (that performs a request to www.cbr.ru) - I am working on it

Applications:

1. **Console c# application**: pass your currency name (USD/EUR/RUR - https://en.wikipedia.org/wiki/ISO_4217), your amount and the target currency name as command line arguments and run it. The application will show new amount (or error message).
1. **Browser applications that**:
   - uses exchange rates from www.cbr.ru (https://www.cbr.ru/scripts/XML_daily.asp)
   - shows 'loading' spinner on initial data fetching
   - shows error message if fetch was not secceeded and switches to 'demo' exchange rates
   - allows to select source currency, enter amount, select the target currency and then it will show the target amount and rate between source and target currencies.

There are **3 browser applications** with the same look&feel:
1. vanilla-js app
1. react app
1. vue app - I am working on it
