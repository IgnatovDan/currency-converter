namespace CurrencyConverter.ExchangeRateSources {
  public interface IExchangeSource {
    Task<ExchangeRates> GetRates();
  }

  public class ExchangeSourcesManager {
    Dictionary<string, IExchangeSource> sources { get; } = new Dictionary<string, IExchangeSource>();

    public void RegisterSource(string sourceName!!, IExchangeSource exchangeSource!!) {
      if (sourceName == String.Empty) {
        throw new ArgumentNullException($"'{nameof(sourceName)}' cannot be null or empty.", nameof(sourceName));
      }

      this.sources.Add(sourceName, exchangeSource);
    }

    public IExchangeSource GetSource(string sourceName!!) {
      IExchangeSource? exchangeRatesSource;
      if (!sources.TryGetValue(sourceName, out exchangeRatesSource) || (exchangeRatesSource == null)) {
        throw new Exception($"Cannot find '{sourceName}' rates source. Available sources: {String.Join(", ", sources.Keys)}.");
      }
      if (exchangeRatesSource == null) {
        throw new Exception($"A 'null' value is received by the '{sourceName}' rates source name.");
      }
      return exchangeRatesSource;
    }

    public Task<ExchangeRates> GetExchangeRates_(string sourceName!!) {
      IExchangeSource? exchangeRatesSource;
      if (!sources.TryGetValue(sourceName, out exchangeRatesSource) || (exchangeRatesSource == null)) {
        throw new Exception($"Cannot find '{sourceName}' rates source. Available sources: {String.Join(", ", sources.Keys)}.");
      }
      if (exchangeRatesSource == null) {
        throw new Exception($"A 'null' value is received by the '{sourceName}' rates source name.");
      }
      return exchangeRatesSource.GetRates();
    }
  }
}
