using ExchangeConverter;

namespace CbrAdapter {
  public class CbrRatesSource : IRatesSource {
    private const string DefaultUrl = "https://www.cbr.ru/scripts/XML_daily.asp";

    public static CbrRatesSource Instance { get; } = new CbrRatesSource();

    private string url { get; }
    public CbrRatesSource(string url = DefaultUrl) {
      this.url = url;
    }
    public async Task<IExchangeRates> getRates() {
      var cbrRates = await CbrAdapter.Adapter.GetExchangeRates(url);
      return Utils.Utils.ConvertToExchangeRates(cbrRates);
    }
  }
}
