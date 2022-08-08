using CurrencyConverter.ExchangeRateSources.DataObjects;

namespace CurrencyConverterTests.ExchangeSources.DataObjects {
  public class ExchangeRatesTests {
    [Theory, MemberData(nameof(GetCurrency_NotFound_Data))]
    public void GetCurrency_NotFound(string charCode) {
      // Given
      ExchangeRates rates = new ExchangeRates(null);
      rates.Items.Add(new Currency("a", "b", 42));

      // When
      var ex = Assert.Throws<System.Exception>(() => rates.GetCurrency(charCode));
      Assert.Contains("currency was not found", ex.Message);
    }
    public static IEnumerable<object?[]> GetCurrency_NotFound_Data => new List<object?[]> {
      new object?[] { null },
      new object?[] { "" },
      new object?[] { "not exist" }
    };

    [Theory, MemberData(nameof(GetCurrency_Found_Data))]
    public void GetCurrency_Found(string charCode) {
      // Given
      ExchangeRates rates = new ExchangeRates(null);
      rates.Items.Add(new Currency("a", "a_", 42));
      rates.Items.Add(new Currency("b", "b_", 42));

      // When
      var ex = Assert.Throws<System.Exception>(() => rates.GetCurrency(charCode));
      Assert.Contains("currency was not found", ex.Message);
    }
    public static IEnumerable<object?[]> GetCurrency_Found_Data => new List<object?[]> {
      new object?[] { "a" },
      new object?[] { "A" },
      new object?[] { "b" },
    };

    [Fact]
    public void EnsureRUB_NoRUB() {
      // Given
      ExchangeRates rates = new ExchangeRates(null);

      // When
      rates.EnsureRUB();

      // Then
      Assert.Single(rates.Items);
      Assert.Equal("RUB", rates.Items[0].CharCode);
      Assert.Equal("Российский рубль", rates.Items[0].Name);
      Assert.Equal(1, rates.Items[0].Value);
    }

    [Fact]
    public void EnsureRUB_HasRUB() {
      // Given
      ExchangeRates rates = new ExchangeRates(null);
      var rub = new Currency("Российский рубль", "RUB", 1);
      rates.Items.Add(rub);

      // When
      rates.EnsureRUB();

      // Then
      Assert.Single(rates.Items);
      Assert.Equal(rub, rates.Items[0]);
    }    
  }
}
