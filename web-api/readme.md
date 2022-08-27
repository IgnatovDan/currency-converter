# Web API for Currency Converter (ASP.NET Core)

## Application:
 - provides api to download xml/json with exchange rates based on data from www.cbr.ru (https://www.cbr.ru/scripts/XML_daily.asp)

![image](https://user-images.githubusercontent.com/2094015/185815269-6f5abf90-6a63-496a-a9a5-75581d02b1ab.png)

API urls:
- 'https://localhost:7040/exchange-rates-1251.xml'
- 'https://localhost:7040/exchange-rates-utf.json'

Available Scripts:

- `dotnet run --project web-api` - to run web-api server
- `dotnet test` - to run tests

## Used technologies
c#, ASP.NET Core 6, UT, xUnit, TDD, minimal web api, http, xml, json, Github Actions.

This is an ASP.NET Core application, project was bootstrapped with [Create a minimal web API with ASP.NET Core](https://docs.microsoft.com/en-us/aspnet/core/tutorials/min-web-api?view=aspnetcore-6.0&tabs=visual-studio).

```
dotnet new web -o web-api
dotnet new xunit -o web-api-test
dotnet add web-api-test reference web-api
dotnet new sln
dotnet sln add web-api
dotnet sln add web-api-test
dotnet add web-api-test package Microsoft.AspNetCore.Mvc.Testing
dotnet add web-api-test package Moq 
```
[.NET default templates for dotnet new](https://docs.microsoft.com/en-us/dotnet/core/tools/dotnet-new-sdk-templates#test)

## Github actions

See https://github.com/IgnatovDan/currency-converter/blob/master/.github/workflows/web-api-tests.yml

[![Run `Converter web-api tests`](https://github.com/IgnatovDan/currency-converter/actions/workflows/web-api-tests.yml/badge.svg)](https://github.com/IgnatovDan/currency-converter/actions/workflows/web-api-tests.yml)

## Links
- https://github.com/IgnatovDan/Sandbox/tree/main/tasks/transactions-web-api#readme
