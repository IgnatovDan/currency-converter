using CurrencyConverter.ExchangeRateSources;

namespace CurrencyConverter.ExchangeRateSources.WebApiJson {
  public class WebApiJsonRatesSource : IExchangeRatesSource {
    private const string DefaultUrl = "https://localhost:7040/exchange-rates-utf.json";

    private string url { get; }

    private static ExchangeRates ConvertToCurrencyConverterDTO(JsonExchangeRates rates) {
      var result = new ExchangeRates(rates?.Date);
      if (rates != null && rates.Items != null) {
        result.Items.AddRange(
          rates.Items!
            .Where(item =>
              // filter objects without required values (incorrect objects from an external resource)
              !string.IsNullOrWhiteSpace(item.Name)
              && !string.IsNullOrWhiteSpace(item.CharCode)
              && item.Value != 0)
            .Select(
              item => new Currency(
                item.Name!,
                item.CharCode!,
                item.Value ?? 0
              )
            )
        );
      }
      return result;
    }

    public WebApiJsonRatesSource(string url = DefaultUrl) {
      this.url = url;
    }

    public async Task<ExchangeRates> GetRates() {
      var rates = await WebApiJsonAdapter.GetExchangeRates(url);
      return ConvertToCurrencyConverterDTO(rates);
    }
  }
}
