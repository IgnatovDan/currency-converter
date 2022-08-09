using CurrencyConverter.ExchangeRateSources;

using Moq;

namespace CurrencyConverterTests.ExchangeSources {

  public class ExchangeSourcesManagerTests {
    [Theory, MemberData(nameof(RegisterSource_NullSourceName_Data))]
    public void RegisterSource_NullSourceName(string sourceName, IExchangeRatesSource exchangeSource) {
      var manager = new ExchangeSourcesManager();
      Assert.Throws<System.ArgumentNullException>(() => manager.RegisterSource(sourceName, exchangeSource));
    }
    public static IEnumerable<object?[]> RegisterSource_NullSourceName_Data => new List<object?[]> {
      new object?[] { null, null },
      new object?[] { null, new Mock<IExchangeRatesSource>().Object },
    };

    [Theory, MemberData(nameof(RegisterSource_EmptyStringSourceName_Data))]
    public void RegisterSource_EmptyStringSourceName(string sourceName, IExchangeRatesSource exchangeSource) {
      var manager = new ExchangeSourcesManager();
      Assert.Throws<System.ArgumentNullException>(() => manager.RegisterSource(sourceName, exchangeSource));
    }
    public static IEnumerable<object?[]> RegisterSource_EmptyStringSourceName_Data => new List<object?[]> {
      new object?[] { "", null },
      new object?[] { "", new Mock<IExchangeRatesSource>().Object },
    };

    [Theory, MemberData(nameof(RegisterSource_NullSource_Data))]
    public void RegisterSource_NullSource(IExchangeRatesSource exchangeSource) {
      var manager = new ExchangeSourcesManager();
      Assert.Throws<System.ArgumentNullException>(() => manager.RegisterSource("a", exchangeSource));
    }
    public static IEnumerable<object?[]> RegisterSource_NullSource_Data => new List<object?[]> {
      new object?[] { null }
    };

    [Theory, MemberData(nameof(GetRates_NullSourceName_Data))]
    public void GetRates_NullSourceName(string sourceName) {
      var manager = new ExchangeSourcesManager();
      Assert.Throws<System.ArgumentNullException>(() => manager.GetSource(sourceName));
    }
    public static IEnumerable<object?[]> GetRates_NullSourceName_Data => new List<object?[]> {
      new object?[] { null }
    };

    [Fact]
    public void GetRates_SourceIsNotFound() {
      var manager = new ExchangeSourcesManager();
      manager.RegisterSource("1", new Mock<IExchangeRatesSource>().Object);
      manager.RegisterSource("2", new Mock<IExchangeRatesSource>().Object);
      var ex = Assert.Throws<System.Exception>(() => manager.GetSource("3"));
      Assert.Contains("3", ex.Message);
    }

    [Fact]
    public void GetSource() {
      var source1 = new Mock<IExchangeRatesSource>();
      var source2 = new Mock<IExchangeRatesSource>();

      var manager = new ExchangeSourcesManager();
      manager.RegisterSource("1", source1.Object);
      manager.RegisterSource("2", source2.Object);

      Assert.Equal(source1.Object, manager.GetSource("1"));
      Assert.Equal(source2.Object, manager.GetSource("2"));
    }
  }
}
