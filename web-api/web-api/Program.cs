var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/", () => "Hello World!");

//
// Returns the same result as https://www.cbr-xml-daily.ru/daily.xml
//
app.MapGet("/" + ExchangeRates1251XmlUrl, (HttpContext context) => {
  //await Proxies.ExchangeRatesXml1251.ProcessRequest(context, CbrXmlDailyUrl);
  return "exchange-rates-1251.xml data";
}).WithName("exchange-rates-1251.xml") ;

//
// Returns JSON string, generated from data returned from https://www.cbr-xml-daily.ru/daily.xml
//
app.MapGet("/" + ExchangeRatesUtlJson, (HttpContext context) => {
  return "exchange-rates-utf.json data";
});

app.Run();

public partial class Program {
  public static string ExchangeRates1251XmlUrl { get { return "exchange-rates-1251.xml"; } }
  public static string ExchangeRatesUtlJson { get { return "exchange-rates-utf.json"; } }
}
