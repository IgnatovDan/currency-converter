namespace CurrencyConverter {
  public class Converter {
    public static decimal Convert(decimal amount, decimal sourceRateValue, decimal targetRateValue) {
      return (amount * sourceRateValue / targetRateValue);
    }
  }
}
