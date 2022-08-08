namespace CurrencyConverter.ExchangeRateSources {
  public interface IExchangeRatesSource {
    Task<ExchangeRates> GetRates();
  }

  public class ExchangeSourcesManager {
    Dictionary<string, IExchangeRatesSource> sources { get; } = new Dictionary<string, IExchangeRatesSource>();

    public void RegisterSource(string sourceName!!, IExchangeRatesSource exchangeSource!!) {
      if (sourceName == String.Empty) {
        throw new ArgumentNullException($"'{nameof(sourceName)}' cannot be null or empty.", nameof(sourceName));
      }

      this.sources.Add(sourceName, exchangeSource);
    }

    public IExchangeRatesSource GetSource(string sourceName!!) {
      IExchangeRatesSource? exchangeRatesSource;
      if (!sources.TryGetValue(sourceName, out exchangeRatesSource) || (exchangeRatesSource == null)) {
        throw new Exception($"Cannot find '{sourceName}' rates source. Available sources: {String.Join(", ", sources.Keys)}.");
      }
      if (exchangeRatesSource == null) {
        throw new Exception($"A 'null' value is received by the '{sourceName}' rates source name.");
      }
      return exchangeRatesSource;
    }
  }
}
