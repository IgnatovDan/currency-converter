using ExchangeConverter;

namespace CbrAdapter {
  public class CbrRatesSource : IRatesSource {
    public static CbrRatesSource Instance { get; } = new CbrRatesSource();

    public async Task<ExchangeRates> getRates() {
      var cbrRates = await CbrAdapter.Adapter.GetExchangeRates();
      return Utils.Utils.ConvertToExchangeRates(cbrRates);
    }
  }
}
