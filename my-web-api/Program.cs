using System.Net;
using System.Net.Http.Headers;
using System.Net.Mime;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment()) {
  app.UseSwagger();
  app.UseSwaggerUI();
}

app.UseHttpsRedirection();

const string CbrXmlDailyUrl = "https://www.cbr.ru/scripts/XML_daily.asp";

//
// Returns the same result as https://www.cbr-xml-daily.ru/daily.xml
//
app.MapGet("/exchange-rates-1251.xml", async (HttpContext context) => {
  await Proxies.ExchangeRatesXml1251.ProcessRequest(context, CbrXmlDailyUrl);
}).WithName("CalculateSum") ;

//
// Returns JSON string, generated from data returned from https://www.cbr-xml-daily.ru/daily.xml
//
app.MapGet("/exchange-rates-utf.json", async (HttpContext context) => {
  await Proxies.ExchangeRatesJsonUtf.ProcessRequest(context, CbrXmlDailyUrl);
});

app.Run();
