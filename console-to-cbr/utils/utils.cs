using System.Globalization;

namespace CRBUtils {
  public class Utils {
    public static ExchangeRates GetExchangeRatesFromCBR(CBRExchangeRates rates) {
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
        result.Items.Add(new Currency(Currency.RUB.Name, Currency.RUB.CharCode, Currency.RUB.Value));
      }
      return result;
    }

    private static Currency GetCurrency(List<Currency> items, string charCode) {
      Currency? result = items.FirstOrDefault(item => String.Equals(item.CharCode, charCode, StringComparison.OrdinalIgnoreCase));
      if (result == null) {
        throw new Exception($"The '{charCode}' was not found in the list of available exchange rates");
      }
      return result;
    }

    public static decimal Convert(string sourceCurrencyCharCode, decimal amount, string targetCurrencyCharCode, ExchangeRates rates) {
      var source = GetCurrency(rates.Items, sourceCurrencyCharCode);
      var target = GetCurrency(rates.Items, targetCurrencyCharCode);
      return (amount * source.Value / target.Value);
    }
  }
}
