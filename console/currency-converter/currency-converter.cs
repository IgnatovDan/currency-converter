namespace CurrencyConverter {
  public class Converter {
    private static Currency GetCurrency(IEnumerable<Currency> items, string charCode) {
      Currency? result = items.FirstOrDefault(item => String.Equals(item.CharCode, charCode, StringComparison.OrdinalIgnoreCase));
      if (result == null) {
        throw new Exception($"The '{charCode}' currency was not found in the list of available exchange rates");
      }
      return result;
    }

    public static decimal Convert(string sourceCurrencyCharCode, decimal amount, string targetCurrencyCharCode, IEnumerable<Currency> currencies) {
      var source = GetCurrency(currencies, sourceCurrencyCharCode);
      var target = GetCurrency(currencies, targetCurrencyCharCode);
      return (amount * source.Value / target.Value);
    }
  }
}
