using ExchangeConverter;

namespace WebApiJson {
  public class WebApiJsonRatesSource : IRatesSource {
    private const string DefaultUrl = "https://localhost:7271/exchange-rates-utf.json";

    private string url { get; }
    public WebApiJsonRatesSource(string url = DefaultUrl) {
      this.url = url;
    }
    public async Task<IExchangeRates> getRates() {
      var rates = await WebApiJsonAdapter.GetExchangeRates(url);
      return rates;
    }
  }
}
