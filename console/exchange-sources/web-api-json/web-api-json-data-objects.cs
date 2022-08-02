namespace ExchangeSources.WebApiJson {
  public class JsonExchangeRates {
    public string? Name { get; set; }
    public DateTime Date { get; set; }
    public List<JsonCurrency>? Items { get; set; }
  }

  public class JsonCurrency {
    public string? Name { get; set; }
    public string? CharCode { get; set; }
    public decimal? Value { get; set; }
  }
}
