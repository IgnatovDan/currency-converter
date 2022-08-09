namespace CurrencyConverter.ExchangeRateSources {
  public class ExchangeRates {
    private static Currency RUB { get; } = new Currency("Российский рубль", "RUB", 1);
    public ExchangeRates(DateTime? date) {
      Date = date;
    }
    public DateTime? Date { get; }
    public List<Currency> Items { get; } = new List<Currency>();

    public Currency GetCurrency(string charCode) {
      Currency? result = this.Items.FirstOrDefault(item => String.Equals(item.CharCode, charCode, StringComparison.OrdinalIgnoreCase));
      if (result == null) {
        throw new Exception($"The '{charCode}' currency was not found in the list of available exchange rates");
      }
      return result;
    }

    public void EnsureRUB() {
      if (!this.Items.Any(item => item.CharCode == ExchangeRates.RUB.CharCode)) {
        this.Items.Add(ExchangeRates.RUB);
      }
    }
  }

  public class Currency {
    public Currency(string name, string charCode, decimal value) {
      Name = name;
      CharCode = charCode;
      Value = value;
    }
    public string Name { get; }
    public string CharCode { get; }
    public decimal Value { get; }
  }
}
