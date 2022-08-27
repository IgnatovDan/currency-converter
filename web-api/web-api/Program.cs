using Handlers;

using Microsoft.AspNetCore.Mvc;

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/", () => "Hello world!");

const string cbrXmlDailyUrl = "https://www.cbr.ru/scripts/XML_daily.asp";

//
// Returns the same result as https://www.cbr-xml-daily.ru/daily.xml
//
app.MapGet(
  "/exchange-rates-1251.xml",
  async (HttpContext context, [FromServices] ICbrHttpClientFactory cbrHttpClientFactory) => {
    await ExchangeRates1251XmlHandler.Handle(context, cbrHttpClientFactory, cbrXmlDailyUrl);
  }
);

//
// Returns JSON string, generated from data returned from https://www.cbr-xml-daily.ru/daily.xml
//
app.MapGet(
  "/exchange-rates-utf.json",
  async (HttpContext context, [FromServices] ICbrHttpClientFactory cbrHttpClientFactory) => {
    await ExchangeRatesUtfJsonHandler.Handle(context, cbrHttpClientFactory, cbrXmlDailyUrl);
  }
);

app.Run();

public partial class Program { }
