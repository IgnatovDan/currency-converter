[![Run `Console Converter` tests](https://github.com/IgnatovDan/currency-converter/actions/workflows/console-run-tests.yml/badge.svg)](https://github.com/IgnatovDan/currency-converter/actions/workflows/console-run-tests.yml)

# Console Currency Converter (.NET Core)

Pass your currency name ([USD/EUR/RUB](https://en.wikipedia.org/wiki/ISO_4217)), your amount and the target currency name as command line arguments and run it. The application will show the target amount.
Application uses exchange rates from www.cbr.ru (https://www.cbr.ru/scripts/XML_daily.asp)

Available Scripts
- ``
- `dotnet run --project currency-converter USD 4000 RUB` - run application with args `USD 4000 RUB` to convert $4000 to RUB and show it in console
- `dotnet run --project currency-converter USD 4000 RUB web-api-proxy` - will use `web-api-proxy` to get exchange rates. Available rate sources: [`cbr`, `web-api-proxy`, `web-api-json`]). `cbr` is default. For `web-api-proxy`/`web-api-json` values build and run 'https://github.com/IgnatovDan/currency-converter/tree/master/web-api'.
- `dotnet test` - to run tests

## Used technologies

.NET Core 6, webapi, http, xml, json, serialization, GitHub workflows, TDD

This is a .NET Core application, project was bootstrapped by [Create a .NET class library using Visual Studio Code](https://docs.microsoft.com/en-us/dotnet/core/tutorials/library-with-visual-studio-code?pivots=dotnet-6-0), [Develop libraries with the .NET CLI](https://docs.microsoft.com/en-us/dotnet/core/tutorials/libraries) and [Unit testing C# in .NET Core using dotnet test and xUnit](https://docs.microsoft.com/en-us/dotnet/core/testing/unit-testing-with-dotnet-test) topics.
