namespace CurrencyConverter.ExchangeRateSources {
  public interface IExchangeSource {
    Task<ExchangeRates> getRates();
  }

  public class ExchangeSourcesManager {
    Dictionary<string, IExchangeSource> sources { get; } = new Dictionary<string, IExchangeSource>();

    public void RegisterSource(string sourceName!!, IExchangeSource exchangeSource) {
      if (string.IsNullOrEmpty(sourceName)) {
        throw new ArgumentException($"'{nameof(sourceName)}' cannot be null or empty.", nameof(sourceName));
      }

      if (exchangeSource is null) {
        throw new ArgumentNullException(nameof(exchangeSource));
      }

      this.sources.Add(sourceName, exchangeSource);
    }

    public async Task<ExchangeRates> GetExchangeRates(string sourceName) {
      IExchangeSource? exchangeRatesSource;
      if (!sources.TryGetValue(sourceName, out exchangeRatesSource) || (exchangeRatesSource == null)) {
        throw new Exception($"Cannot find '{sourceName}' rates source. Available sources: {String.Join(", ", sources.Keys)}.");
      }
      if (exchangeRatesSource == null) {
        throw new Exception($"A 'null' value is received by the '{sourceName}' rates source name.");
      }
      return await exchangeRatesSource.getRates();
    }
  }
}
