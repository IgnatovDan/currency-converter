using System.Globalization;

namespace CRBUtils {
  public class ExchangeRates {
    public ExchangeRates(DateTime date) {
      Date = date;
    }
    public DateTime Date { get; }
    public List<Currency> Items { get; } = new List<Currency>();
  }

  public class Currency {
    public static Currency RUB { get; } = new Currency("Российский рубль", "RUB", 1);
    public Currency(string name, string charCode, decimal value) {
      Name = name;
      CharCode = charCode;
      Value = value;
    }
    public string Name { get; }
    public string CharCode { get; }
    public decimal Value { get; }
  }

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
              decimal.Parse(item.Value!, new NumberFormatInfo() { NumberDecimalSeparator = "," })
            )
          ).Where(item => item.Value != 0 /* cannot use such rates to exchange */)
      );
      if (!result.Items.Any(item => item.CharCode == Currency.RUB.CharCode)) {
        result.Items.Add(new Currency(Currency.RUB.Name, Currency.RUB.CharCode, Currency.RUB.Value));
      }
      return result;
    }

    public static decimal Convert(string sourceCurrency, decimal amount, string targetCurrency, ExchangeRates rates) {
      var source = rates.Items.FirstOrDefault(item => item.CharCode == sourceCurrency);
      if (source == null) {
        throw new Exception($"The '{sourceCurrency}' was not found in the list of exchange rates");
      }
      var target = rates.Items.FirstOrDefault(item => item.CharCode == targetCurrency);
      if (target == null) {
        throw new Exception($"The '{targetCurrency}' was not found in the list of exchange rates");
      }
      return (amount * source.Value / target.Value);
    }
  }
}
