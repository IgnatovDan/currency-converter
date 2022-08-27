using Microsoft.AspNetCore.Mvc.Testing;

namespace web_api_test;

public class UnitTest1 {
  [Fact]
  public async void RootEndpoint_Get_Tests() {
    await using var application = new WebApplicationFactory<Program>();
    // TODO: setup test application object to return 'exchange-rates-utf.json data'
    using var client = application.CreateClient();

    var response = await client.GetStringAsync("/" + Program.ExchangeRatesUtlJson);

    Assert.Equal("exchange-rates-utf.json data", response);
  }
}
