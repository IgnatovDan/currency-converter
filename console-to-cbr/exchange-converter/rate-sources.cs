namespace ExchangeConverter {
  public interface IRatesSource {
    Task<ExchangeRates> getRates();
  }

  public class RateSources {
    static Dictionary<string, IRatesSource> ratesSources { get; } = new Dictionary<string, IRatesSource>();
    
    public static IEnumerable<string> GetRateSourcesKeys() {
      return ratesSources.Keys;
    }

    public static void RegisterRatesSource(string key, IRatesSource ratesSource) {
      if (string.IsNullOrEmpty(key)) {
        throw new ArgumentException($"'{nameof(key)}' cannot be null or empty.", nameof(key));
      }

      if (ratesSource is null) {
        throw new ArgumentNullException(nameof(ratesSource));
      }

      RateSources.ratesSources.Add(key, ratesSource);
    }

    public static async Task<ExchangeRates> GetRates(string ratesSourceName) {
      IRatesSource? ratesSource;
      if (!RateSources.ratesSources.TryGetValue(ratesSourceName, out ratesSource) || (ratesSource == null)) {
        throw new Exception($"Cannot find '{ratesSourceName}' rates source.");
      }
      if (ratesSource == null) {
        throw new Exception($"A 'null' value is received by the '{ratesSourceName}' rates source name.");
      }
      return await ratesSource.getRates();
    }
  }
}
