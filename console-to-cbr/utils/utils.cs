using System.Globalization;

using ExchangeConverter;
using CRBAdapter;

namespace Utils {
  public class Utils {
    public static ExchangeRates ConvertToExchangeRates(CBRExchangeRates rates) {
      var result = new ExchangeRates(
        DateTime.ParseExact(rates?.Date ?? "", "d.m.yyyy", CultureInfo.InvariantCulture)
      );
      result.Items.AddRange(
        (rates ?? new CBRExchangeRates()).Items
          .Where(item =>
            // filter objects without required value (incorrect objects from an external resource)
            !string.IsNullOrWhiteSpace(item.Name)
            && !string.IsNullOrWhiteSpace(item.CharCode)
            && !string.IsNullOrWhiteSpace(item.Value))
          .Select(
            item => new Currency(
              item.Name!,
              item.CharCode!,
              decimal.Parse(item.Value!, new NumberFormatInfo() { NumberDecimalSeparator = "," }) /* сценарии с разными разделителями не проверял */
            )
          ).Where(item => item.Value != 0 /* cannot use such rates to exchange */)
      );
      if (!result.Items.Any(item => item.CharCode == Currency.RUB.CharCode)) {
        result.Items.Add(Currency.RUB);
      }
      return result;
    }
  }
}
