using System.Globalization;

namespace CurrencyConverter.ExchangeRateSources.Cbr {
  public class CbrRatesSource : IExchangeSource {
    private const string DefaultUrl = "https://www.cbr.ru/scripts/XML_daily.asp";

    private string url { get; }

    private static ExchangeRates ConvertToCurrencyConverterDTO(CbrExchangeRates rates) {
      var result = new ExchangeRates(
        DateTime.ParseExact(rates?.Date ?? "", "d.m.yyyy", CultureInfo.InvariantCulture)
      );
      result.Items.AddRange(
        (rates ?? new CbrExchangeRates()).Items
          .Where(item =>
            // filter objects without required values (incorrect objects from an external resource)
            !string.IsNullOrWhiteSpace(item.Name)
            && !string.IsNullOrWhiteSpace(item.CharCode)
            && !string.IsNullOrWhiteSpace(item.Value))
          .Select(
            item => new Currency(
              item.Name!,
              item.CharCode!,
              decimal.Parse(item.Value!, new NumberFormatInfo() { NumberDecimalSeparator = "," }) /* XML_daily.asp uses this delimiter */
            )
          ).Where(item => item.Value > 0 /* remove currencies without values */)
      );
      return result;
    }

    public CbrRatesSource(string url = DefaultUrl) {
      this.url = url;
    }
    public async Task<ExchangeRates> getRates() {
      var cbrRates = await ExchangeRateSources.Cbr.Adapter.GetExchangeRates(url);
      return ConvertToCurrencyConverterDTO(cbrRates);
    }
  }
}
