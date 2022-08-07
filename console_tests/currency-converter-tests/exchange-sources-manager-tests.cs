using CurrencyConverter.ExchangeRateSources;

namespace CurrencyConverterTests {
  class ExchangeSourceMock : IExchangeSource {
    public Func<Task<ExchangeRates>>? getRates = null;
    Task<ExchangeRates> IExchangeSource.getRates() {
      return (getRates == null) ? new Task<ExchangeRates>(() => new ExchangeRates(null)) : getRates();
    }
  }

  public class ExchangeSourcesManagerTests {
    [Theory, MemberData(nameof(RegisterSource_NullSourceName_Data))]
    public void RegisterSource_NullSourceName(string sourceName, IExchangeSource exchangeSource) {
      var manager = new ExchangeSourcesManager();
      Assert.Throws<System.ArgumentNullException>(() => manager.RegisterSource(sourceName, exchangeSource));
    }
    public static IEnumerable<object?[]> RegisterSource_NullSourceName_Data => new List<object?[]> {
      new object?[] { null, null },
      new object?[] { null, new ExchangeSourceMock() },
    };

    [Theory, MemberData(nameof(RegisterSource_EmptyStringSourceName_Data))]
    public void RegisterSource_EmptyStringSourceName(string sourceName, IExchangeSource exchangeSource) {
      var manager = new ExchangeSourcesManager();
      Assert.Throws<System.ArgumentException>(() => manager.RegisterSource(sourceName, exchangeSource));
    }
    public static IEnumerable<object?[]> RegisterSource_EmptyStringSourceName_Data => new List<object?[]> {
      new object?[] { "", null },
      new object?[] { "", new ExchangeSourceMock() },
    };

    [Theory, MemberData(nameof(RegisterSource_NullSource_Data))]
    public void RegisterSource_NullSource(IExchangeSource exchangeSource) {
      var manager = new ExchangeSourcesManager();
      Assert.Throws<System.ArgumentNullException>(() => manager.RegisterSource("a", exchangeSource));
    }
    public static IEnumerable<object?[]> RegisterSource_NullSource_Data => new List<object?[]> {
      new object?[] { null }
    };
  }
}
