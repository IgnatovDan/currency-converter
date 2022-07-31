# Console Currency Converter (.NET Core)

Pass your currency name (USD/EUR/RUB - https://en.wikipedia.org/wiki/ISO_4217), your amount and the target currency name as command line arguments and run it. The application will show the target amount.

For example, type 'dotnet run USD 4000 RUB' to run it from VSCode terminal.

Application uses exchange ratesfrom www.cbr.ru (https://www.cbr.ru/scripts/XML_daily.asp)

## Used technologies
.NET Core 6, http, xml, serialization

This is a .NET Core application, project was bootstrapped with [Create a .NET console application using Visual Studio Code](https://docs.microsoft.com/en-us/dotnet/core/tutorials/with-visual-studio-code?pivots=dotnet-6-0): 'dotnet new console --framework net6.0'

#### TODO:
- add [Connect to: CBR | My web apy XML | My web apy JSON] toggler to console, vanillajs and react implementations
- add unit tests
