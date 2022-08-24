# Web API for Currency Converter (ASP.NET Core)

## Application:
 - provides api to download xml with exchange rates based on data from www.cbr.ru (https://www.cbr.ru/scripts/XML_daily.asp)

API urls:
- 'https://localhost:7271/exchange-rates-1251.xml'
- 'https://localhost:7271/exchange-rates-utf.json'

Available Scripts:

- `dotnet run --project my-web-api.csproj` - to run web-api server
- `dotnet test` - to run tests
 
## Used technologies
.NET Core 6, ASP.NET Core, minimal web api, http

This is a ASP.NET Core application, project was bootstrapped with [Create a minimal web API with ASP.NET Core](https://docs.microsoft.com/en-us/aspnet/core/tutorials/min-web-api?view=aspnetcore-6.0&tabs=visual-studio).

#### TODO:
- read requested charset/encoding from request headers and use these values to generate response
- add tests
