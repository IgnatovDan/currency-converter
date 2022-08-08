namespace CurrencyConverter.ExchangeRateSources.DataObjects {
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
