[![Run `Console Converter` tests](https://github.com/IgnatovDan/currency-converter/actions/workflows/console-run-tests.yml/badge.svg)](https://github.com/IgnatovDan/currency-converter/actions/workflows/console-run-tests.yml)

# Console Currency Converter (.NET Core)

Pass your currency name ([USD/EUR/RUB](https://en.wikipedia.org/wiki/ISO_4217)), your amount and the target currency name as command line arguments and run it. The application will show the target amount.

## Run application

Run `dotnet run --project currency-converter/currency-converter.csproj USD 4000 RUB` in VSCode terminal.
You can specify the exchange rates source as the 4th argument: 'cbr', 'web-api-proxy' or 'web-api-json'. For example: `dotnet run --project currency-converter/currency-converter.csproj USD 4000 RUB web-api-proxy`
For 'web-api-proxy' or 'web-api-json' values build and run 'https://github.com/IgnatovDan/currency-converter/tree/master/my-web-api' (it will start local server).

Application uses exchange rates from www.cbr.ru (https://www.cbr.ru/scripts/XML_daily.asp)

## Run tests

Run the `dotnet test` command from the root folder

(I created the [backup_console_without-tests](https://github.com/IgnatovDan/currency-converter/tree/backup_console_without-tests) branch to keep sources of 'console-currency-converter' without any test)

## Used technologies

.NET Core 6, webapi, http, xml, json, serialization, GitHub workflows, TDD

This is a .NET Core application, project was bootstrapped by [Create a .NET class library using Visual Studio Code](https://docs.microsoft.com/en-us/dotnet/core/tutorials/library-with-visual-studio-code?pivots=dotnet-6-0), [Develop libraries with the .NET CLI](https://docs.microsoft.com/en-us/dotnet/core/tutorials/libraries) and [Unit testing C# in .NET Core using dotnet test and xUnit](https://docs.microsoft.com/en-us/dotnet/core/testing/unit-testing-with-dotnet-test) topics.

#### TODO:
- add unit tests - in progress
