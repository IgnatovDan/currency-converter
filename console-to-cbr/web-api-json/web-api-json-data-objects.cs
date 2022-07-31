using ExchangeConverter;

namespace WebApiJson {
  public class ExchangeRates : IExchangeRates {
    public string? Name { get; set; }
    public DateTime Date { get; set; } // parse as Date
    public List<Currency> Items { get; set; } = new List<Currency>();

    IEnumerable<ICurrency> IExchangeRates.Items => Items;
  }

  public class Currency : ICurrency {
    public string? Name { get; set; }
    public string? CharCode { get; set; }
    public decimal? Value { get; set; }

    decimal ICurrency.Value => Value ?? 0;
    string ICurrency.Name => Name ?? "";
    string ICurrency.CharCode => CharCode ?? "";
  }
}
