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

//
// Like https://www.cbr-xml-daily.ru/daily.xml
// swagger doesn't show this api, but you can access it directly: https://localhost:7271/exchange-rates-xml-1251.xml
//
app.MapGet("/exchange-rates-xml-1251.xml", async (HttpContext context) => {
  await ExchangeRatesXml1251.Main.ProcessRequest(context);
});

app.Run();
