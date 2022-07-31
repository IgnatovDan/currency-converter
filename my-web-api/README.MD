# Web API for Currency Converter (ASP.NET Core)

## Application:
 - provides api to download xml with exchange rates based on data from www.cbr.ru (https://www.cbr.ru/scripts/XML_daily.asp)

API urls:
- 'https://localhost:7271/swagger' (it doesn't show 'exchange-rates-xml-1251.xml')
- 'https://localhost:7271/exchange-rates-1251.xml'
- 'https://localhost:7271/exchange-rates-utf.json'
(Or,  format and encoding can be requested in headers and service can return different values from single 'api' method)

 
## Used technologies
.NET Core 6, ASP.NET Core, minimal web api, http

This is a ASP.NET Core application, project was bootstrapped with [Create a minimal web API with ASP.NET Core](https://docs.microsoft.com/en-us/aspnet/core/tutorials/min-web-api?view=aspnetcore-6.0&tabs=visual-studio).

#### TODO:
- add JSON API
- handle charset from request headers
