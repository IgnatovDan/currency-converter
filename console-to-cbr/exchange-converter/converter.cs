namespace ExchangeConverter {
  public class Converter {
    private static ICurrency GetCurrency(IEnumerable<ICurrency> items, string charCode) {
      ICurrency? result = items.FirstOrDefault(item => String.Equals(item.CharCode, charCode, StringComparison.OrdinalIgnoreCase));
      if (result == null) {
        throw new Exception($"The '{charCode}' currency was not found in the list of available exchange rates");
      }
      return result;
    }

    public static decimal Convert(string sourceCurrencyCharCode, decimal amount, string targetCurrencyCharCode, IExchangeRates rates) {
      var source = GetCurrency(rates.Items, sourceCurrencyCharCode);
      var target = GetCurrency(rates.Items, targetCurrencyCharCode);
      return (amount * source.Value / target.Value);
    }
  }
}
