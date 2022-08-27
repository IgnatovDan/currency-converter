using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.AspNetCore.TestHost;
using Microsoft.Extensions.DependencyInjection;

using Handlers;

namespace web_api_test;

public class ExchangeRates1251XmlTests {
  //
  // xUnit handles `async void` and it can be used in tests: 
  // - [Using async void in xUnit tests](https://www.damirscorner.com/blog/posts/20220415-UsingAsyncVoidInXunitTests.html)
  // - [XUnit supports async void test methods correctly via a custom synchronization context](https://github.com/xunit/xunit/issues/1405)
  //
  [Fact]
  public async void Test_OneCorrectEntry() {
    await using var application = new WebApplicationFactory<Program>().WithWebHostBuilder(builder => {
      builder.ConfigureTestServices(services => {
        services.AddSingleton<ICbrRatesProvider>((IServiceProvider provider) => new TestCbrRatesProvider());
      });
    });

    using var client = application.CreateClient();

    var response = await client.GetStringAsync("/exchange-rates-1251.xml");

    Assert.Equal(
@"<ValCurs Date=""27.08.2022"" name=""Foreign Currency Market"">
<Valute ID=""R01235"">
<NumCode>840</NumCode>
<CharCode>USD</CharCode>
<Nominal>1</Nominal>
<Name>Доллар США</Name>
<Value>60,0924</Value>
</Valute>
</ValCurs>", response);
  }
}
