using Handlers;

using Microsoft.AspNetCore.Mvc;

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/", () => "Hello world!");

//
// Returns the same result as https://www.cbr-xml-daily.ru/daily.xml
//
app.MapGet(
  "/exchange-rates-1251.xml",
  ([FromServices] ICbrRatesProvider cbrRatesProvider) => {
    return ExchangeRates1251XmlHandler.Handle(cbrRatesProvider);
  }
);

//
// Returns JSON string, generated from data returned from https://www.cbr-xml-daily.ru/daily.xml
//
app.MapGet(
  "/exchange-rates-utf.json",
  async Task (HttpContext context, [FromServices] ICbrRatesProvider cbrRatesProvider) => {
    await ExchangeRatesUtfJsonHandler.Handle(context, cbrRatesProvider);
  }
);

app.Run();

public partial class Program { }
