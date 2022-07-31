using ExchangeConverter;

namespace CbrAdapter {
  public class CbrRatesSource : IRatesSource {
    private const string CbrXmlDailyAspUrl = "https://www.cbr.ru/scripts/XML_daily.asp";

    public static CbrRatesSource Instance { get; } = new CbrRatesSource();

    private string url { get; }
    public CbrRatesSource(string url = CbrXmlDailyAspUrl) {
      this.url = url;
    }
    public async Task<ExchangeRates> getRates() {
      var cbrRates = await CbrAdapter.Adapter.GetExchangeRates(url);
      return Utils.Utils.ConvertToExchangeRates(cbrRates);
    }
  }
}
