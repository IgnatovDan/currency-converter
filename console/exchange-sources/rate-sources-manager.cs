using CurrencyConverter;

namespace ExchangeSources {
  public interface IRatesSource {
    Task<ExchangeRates> getRates();
  }

  public class RateSourcesManager {
    Dictionary<string, IRatesSource> rateSources { get; } = new Dictionary<string, IRatesSource>();

    public void RegisterRatesSource(string key, IRatesSource ratesSource) {
      if (string.IsNullOrEmpty(key)) {
        throw new ArgumentException($"'{nameof(key)}' cannot be null or empty.", nameof(key));
      }

      if (ratesSource is null) {
        throw new ArgumentNullException(nameof(ratesSource));
      }

      rateSources.Add(key, ratesSource);
    }

    public async Task<ExchangeRates> GetRates(string ratesSourceName) {
      IRatesSource? ratesSource;
      if (!rateSources.TryGetValue(ratesSourceName, out ratesSource) || (ratesSource == null)) {
        throw new Exception($"Cannot find '{ratesSourceName}' rates source. Available sources: {String.Join(", ", rateSources.Keys)}.");
      }
      if (ratesSource == null) {
        throw new Exception($"A 'null' value is received by the '{ratesSourceName}' rates source name.");
      }
      return await ratesSource.getRates();
    }
  }
}
