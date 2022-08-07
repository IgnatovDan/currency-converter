using CurrencyConverter;

namespace currency_converter_tests;

public class CurrencyConverterTests {
  [Theory]
  [InlineData(1, 1, 1, 1)]
  [InlineData(20, 0.5, 2, 5)]
  [InlineData(100, 1, 50, 2)]
  public void Convert(decimal amount, decimal sourceRateValue, decimal targetRateValue, decimal expectedResult) {
    var result = Converter.Convert(amount, sourceRateValue, targetRateValue);
    Assert.Equal(expectedResult, result);
  }
}
