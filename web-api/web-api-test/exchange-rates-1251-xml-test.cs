using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.AspNetCore.TestHost;
using Microsoft.Extensions.DependencyInjection;

using Handlers;
using System.Text;
using System.Xml.Serialization;

namespace web_api_test;

public class ExchangeRates1251XmlTests {
  // xUnit handles `async void` and it can be used in tests: 
  // - [Using async void in xUnit tests](https://www.damirscorner.com/blog/posts/20220415-UsingAsyncVoidInXunitTests.html)
  // - [XUnit supports async void test methods correctly via a custom synchronization context](https://github.com/xunit/xunit/issues/1405)
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
        );
      });
    });

    using var client = application.CreateClient();

    var response = await client.GetAsync("/exchange-rates-1251.xml");
    
    // Uncomment to run test on response from CBR site
    // var response = await new HttpClient().GetAsync("https://www.cbr.ru/scripts/XML_daily.asp");

    var bytes = await response.Content.ReadAsByteArrayAsync();
    System.Text.Encoding.RegisterProvider(System.Text.CodePagesEncodingProvider.Instance); // required to call Encoding.GetEncoding("windows-1251")
    var actualResponseString = Encoding.GetEncoding("windows-1251").GetString(bytes);

    Assert.True(response.IsSuccessStatusCode);
    Assert.Equal("windows-1251", response.Content.Headers.ContentType?.CharSet);
    Assert.Equal("application/xml", response.Content.Headers.ContentType?.MediaType);
    Assert.Equal(cbrResponseMessageContent, actualResponseString);
  }
}
