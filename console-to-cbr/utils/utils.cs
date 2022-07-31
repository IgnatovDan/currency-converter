using System.Globalization;

using ExchangeConverter;
using CbrAdapter;

namespace Utils {
  public class Utils {
    public static ExchangeRates ConvertToExchangeRates(CbrExchangeRates rates) {
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
      if (!result.Items.Any(item => item.CharCode == Currency.RUB.CharCode)) {
        result.Items.Add(Currency.RUB);
      }
      return result;
    }
  }
}
