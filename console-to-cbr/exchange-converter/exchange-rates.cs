namespace ExchangeConverter {
  public interface IExchangeRates {
    DateTime Date { get; }
    IEnumerable<ICurrency> Items { get; }
  }

  public interface ICurrency {
    string Name { get; }
    string CharCode { get; }
    decimal Value { get; }
  }

  public class ExchangeRates : IExchangeRates {
    public ExchangeRates(DateTime date) {
      Date = date;
    }
    public DateTime Date { get; }
    public List<Currency> Items { get; } = new List<Currency>();

    IEnumerable<ICurrency> IExchangeRates.Items => Items;
  }

  public class Currency : ICurrency {
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
