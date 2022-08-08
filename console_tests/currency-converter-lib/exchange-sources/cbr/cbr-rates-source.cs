using System.Globalization;

namespace CurrencyConverter.ExchangeRateSources.Cbr {
  public interface ICbrRatesAdapter {
    Task<CbrExchangeRates> GetRates();
  }
  public class CbrRatesSource : IExchangeRatesSource, IDisposable {
    private const string DefaultCbrRatesUrl = "https://www.cbr.ru/scripts/XML_daily.asp";

    private ICbrRatesAdapter adapter { get; }

    private static ExchangeRates ConvertToExchangeRates(CbrExchangeRates rates) {
      var result = new ExchangeRates(
        String.IsNullOrEmpty(rates?.Date) ? null : DateTime.ParseExact(rates?.Date ?? "", "dd.MM.yyyy", CultureInfo.InvariantCulture)
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

    public CbrRatesSource() : this(new CbrExchangeRatesAdapter(new HttpClient(), DefaultCbrRatesUrl)) { }
    public CbrRatesSource(string cbrRatesUrl!!) : this(new CbrExchangeRatesAdapter(cbrRatesUrl)) { }
    public CbrRatesSource(ICbrRatesAdapter adapter!!) {
      this.adapter = adapter;
    }

    public void Dispose() {
      (this.adapter as IDisposable)?.Dispose();
    }

    public async Task<ExchangeRates> GetRates() {
      using (var httpClient = new HttpClient()) {
        var adapterRates = await this.adapter.GetRates();
        return ConvertToExchangeRates(adapterRates);
      }
    }
  }
}
