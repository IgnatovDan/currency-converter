using System.Linq;

using Handlers;

using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.AspNetCore.TestHost;
using Microsoft.Extensions.DependencyInjection;

namespace web_api_test;

public class ExchangeRatesUtfJsonTests {
  [Fact]
  public async void Test_OneCorrectEntry() {
    await using var application = new WebApplicationFactory<Program>().WithWebHostBuilder(builder => {
      builder.ConfigureTestServices(services => {
        services.AddSingleton<ICbrRatesProvider>((IServiceProvider provider) => new TestCbrRatesProvider());
      });
    });

    using var client = application.CreateClient();

    var response = await client.GetStringAsync("/exchange-rates-utf.json");

    Assert.Equal(
@"{
  ""Date"": ""2022-01-27T00:08:00"",
  ""Items"": [
    {
      ""Name"": ""Доллар США"",
      ""CharCode"": ""USD"",
      ""Value"": 60.0924
    }
  ]
}", response);
  }
}
