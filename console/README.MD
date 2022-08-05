# Console Currency Converter (.NET Core)

Pass your currency name (USD/EUR/RUB - https://en.wikipedia.org/wiki/ISO_4217), your amount and the target currency name as command line arguments and run it. The application will show the target amount.

For example, type 'dotnet run USD 4000 RUB' to run it from VSCode terminal.
In addition, you can specify the exchange rates source as the 4th argument: 'cbr', 'web-api-proxy' or 'web-api-json'. For example, 'dotnet run USD 4000 RUB web-api-proxy'. For 'web-api-proxy' or 'web-api-json' values build and run 'https://github.com/IgnatovDan/currency-converter/tree/master/my-web-api' (it will start local server).

Application uses exchange rates from www.cbr.ru (https://www.cbr.ru/scripts/XML_daily.asp)

## Used technologies
.NET Core 6, webapi, http, xml, json, serialization

This is a .NET Core application, project was bootstrapped with [Create a .NET console application using Visual Studio Code](https://docs.microsoft.com/en-us/dotnet/core/tutorials/with-visual-studio-code?pivots=dotnet-6-0): 'dotnet new console --framework net6.0'

#### TODO:
- add unit tests
