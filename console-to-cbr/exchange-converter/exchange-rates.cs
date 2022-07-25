namespace ExchangeConverter {
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
}
