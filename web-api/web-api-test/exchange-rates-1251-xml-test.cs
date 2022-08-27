using Microsoft.AspNetCore.Mvc.Testing;

namespace web_api_test;

public class ExchangeRates1251XmlTests {
  //
  // xUnit handles `async void` and it can be used in tests: 
  // - [Using async void in xUnit tests](https://www.damirscorner.com/blog/posts/20220415-UsingAsyncVoidInXunitTests.html)
  // - [XUnit supports async void test methods correctly via a custom synchronization context](https://github.com/xunit/xunit/issues/1405)
  //
  [Fact]
  public async void Test_SomeResult() {
    await using var application = new WebApplicationFactory<Program>();
    // TODO: setup test application object to return 'exchange-rates-1251.xml data'
    using var client = application.CreateClient();

    var response = await client.GetStringAsync("/" + Program.ExchangeRates1251XmlUrl);

    Assert.Equal("exchange-rates-1251.xml data", response);
  }
}
