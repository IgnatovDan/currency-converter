using System.Linq;
using System.Text;

using Handlers;

using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.AspNetCore.TestHost;
using Microsoft.Extensions.DependencyInjection;

namespace web_api_test;

public class ExchangeRatesUtfJsonTests {
  [Fact]
  public async void Test_OneCorrectEntry() {
    string cbrResponseMessageContent =
@"<?xml version=""1.0"" encoding=""windows-1251""?>
<ValCurs Date=""27.08.2022"" name=""Foreign Currency Market"">
<Valute ID=""R01010"">
<NumCode>036</NumCode>
<CharCode>AUD</CharCode>
<Nominal>1</Nominal>
<Name>Австралийский доллар</Name>
<Value>41,8063</Value>
</Valute>
</ValCurs>".Replace("\r\n", "");

    await using var application = new WebApplicationFactory<Program>().WithWebHostBuilder(builder => {
      builder.ConfigureTestServices(services => {
        services.AddSingleton<ICbrHttpClientFactory>(
          (IServiceProvider provider) => new TestCbrHttpClientFactory(cbrResponseMessageContent)

          // Uncomment to run test on response from CBR site
          // (IServiceProvider provider) => new CbrHttpClientFactory()
        );
      });
    });

    using var client = application.CreateClient();

    var response = await client.GetAsync("/exchange-rates-utf.json");

    var bytes = await response.Content.ReadAsByteArrayAsync();
    var actualXmlString = Encoding.UTF8.GetString(bytes);

    Assert.True(response.IsSuccessStatusCode);
    Assert.Equal("utf-8", response.Content.Headers.ContentType?.CharSet);
    Assert.Equal("application/json", response.Content.Headers.ContentType?.MediaType);

    Assert.Equal(
@"{
  ""Date"": ""2022-08-27T00:00:00"",
  ""Items"": [
    {
      ""Name"": ""Австралийский доллар"",
      ""CharCode"": ""AUD"",
      ""Value"": 41.8063
    }
  ]
}", actualXmlString);
  }
}
