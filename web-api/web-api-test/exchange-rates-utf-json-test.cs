using System.Linq;
using System.Net;
using System.Text;

using Handlers;

using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.AspNetCore.TestHost;
using Microsoft.Extensions.DependencyInjection;

namespace web_api_test;

public class ExchangeRatesUtfJsonTests {
  [Theory]
  [InlineData(1251)] // windows-1251 code page
  [InlineData(65001)] // Encoding.UTF8 code page
  public async void Test_OneCorrectEntryFromCbr(int responseEncodingCodePage) {
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
          (IServiceProvider provider) => {
            return new TestCbrHttpClientFactory(responseEncodingCodePage, cbrResponseMessageContent);
            //new TestCbrHttpClientFactory(cbrResponseMessageContent, responseEncodingCodePage)
          }

          // Uncomment to run test on response from CBR site
          // (IServiceProvider provider) => new CbrHttpClientFactory()
        );
      });
    });

    using var client = application.CreateClient();

    var response = await client.GetAsync("/exchange-rates-utf.json");

    var bytes = await response.Content.ReadAsByteArrayAsync();
    var actualResponseString = Encoding.UTF8.GetString(bytes);

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
}", actualResponseString);
  }

  [Fact]
  public async void Test_NoContentFromCbr() {
    await using var application = new WebApplicationFactory<Program>().WithWebHostBuilder(builder => {
      builder.ConfigureTestServices(services => {
        services.AddSingleton<ICbrHttpClientFactory>(
          (IServiceProvider provider) => new TestCbrHttpClientFactory(
            new HttpResponseMessage() { StatusCode = HttpStatusCode.NoContent }
          )
        );
      });
    });

    using var client = application.CreateClient();

    var response = await client.GetAsync("/exchange-rates-utf.json");

    var bytes = await response.Content.ReadAsByteArrayAsync();
    var actualResponseString = Encoding.UTF8.GetString(bytes);

    Assert.True(response.IsSuccessStatusCode, "Actual status code: " + response.StatusCode);
    Assert.Equal("utf-8", response.Content.Headers.ContentType?.CharSet);
    Assert.Equal("application/json", response.Content.Headers.ContentType?.MediaType);

    Assert.Equal(
@"{
  ""Date"": ""0001-01-01T00:00:00"",
  ""Items"": []
}", actualResponseString);
  }

  [Fact]
  public async void Test_BadRequestFromCbr() {
    await using var application = new WebApplicationFactory<Program>().WithWebHostBuilder(builder => {
      builder.ConfigureTestServices(services => {
        services.AddSingleton<ICbrHttpClientFactory>(
          (IServiceProvider provider) => new TestCbrHttpClientFactory(
            new HttpResponseMessage() { StatusCode = HttpStatusCode.BadRequest }
          )
        );
      });
    });

    using var client = application.CreateClient();

    var response = await client.GetAsync("/exchange-rates-utf.json");

    Assert.Equal(HttpStatusCode.InternalServerError, response.StatusCode);
  }

  [Fact]
  public async void Test_NoRequiredValuesFromCbr() {
    string cbrResponseMessageContent =
@"<?xml version=""1.0"" encoding=""windows-1251""?>
<ValCurs Date=""27.08.2022"" name=""Foreign Currency Market"">
<Valute>
<CharCode></CharCode>
<Name>No CharCode</Name>
<Value>41,8063</Value>
</Valute>
<Valute>
<CharCode>12</CharCode>
<Name>No Value</Name>
</Valute>
<Valute>
<CharCode>12</CharCode>
<Value>41,8063</Value>
</Valute>
</ValCurs>".Replace("\r\n", "");
    await using var application = new WebApplicationFactory<Program>().WithWebHostBuilder(builder => {
      builder.ConfigureTestServices(services => {
        services.AddSingleton<ICbrHttpClientFactory>(
          (IServiceProvider provider) => {
            return new TestCbrHttpClientFactory(1251, cbrResponseMessageContent);
          }
        );
      });
    });

    using var client = application.CreateClient();

    var response = await client.GetAsync("/exchange-rates-utf.json");

    var bytes = await response.Content.ReadAsByteArrayAsync();
    var actualResponseString = Encoding.UTF8.GetString(bytes);

    Assert.True(response.IsSuccessStatusCode, "Actual status code: " + response.StatusCode);
    Assert.Equal("utf-8", response.Content.Headers.ContentType?.CharSet);
    Assert.Equal("application/json", response.Content.Headers.ContentType?.MediaType);

    Assert.Equal(
@"{
  ""Date"": ""2022-08-27T00:00:00"",
  ""Items"": []
}", actualResponseString);
  }
}
