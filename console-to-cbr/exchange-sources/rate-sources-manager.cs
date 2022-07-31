using CurrencyConverter;

namespace ExchangeSources {
  public interface IRatesSource {
    Task<ExchangeRates> getRates();
  }

  public class RateSourcesManager {
    static Dictionary<string, IRatesSource> rateSources { get; } = new Dictionary<string, IRatesSource>();

    public static void RegisterRatesSource(string key, IRatesSource ratesSource) {
      if (string.IsNullOrEmpty(key)) {
        throw new ArgumentException($"'{nameof(key)}' cannot be null or empty.", nameof(key));
      }

      if (ratesSource is null) {
        throw new ArgumentNullException(nameof(ratesSource));
      }

      RateSourcesManager.rateSources.Add(key, ratesSource);
    }

    public static async Task<ExchangeRates> GetRates(string ratesSourceName) {
      IRatesSource? ratesSource;
      if (!RateSourcesManager.rateSources.TryGetValue(ratesSourceName, out ratesSource) || (ratesSource == null)) {
        throw new Exception($"Cannot find '{ratesSourceName}' rates source. Available sources: {String.Join(", ", RateSourcesManager.rateSources.Keys)}.");
      }
      if (ratesSource == null) {
        throw new Exception($"A 'null' value is received by the '{ratesSourceName}' rates source name.");
      }
      return await ratesSource.getRates();
    }
  }
}
