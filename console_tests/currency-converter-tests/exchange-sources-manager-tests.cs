using CurrencyConverter.ExchangeRateSources;

using Moq;

namespace CurrencyConverterTests {

  public class ExchangeSourcesManagerTests {
    [Theory, MemberData(nameof(RegisterSource_NullSourceName_Data))]
    public void RegisterSource_NullSourceName(string sourceName, IExchangeSource exchangeSource) {
      var manager = new ExchangeSourcesManager();
      Assert.Throws<System.ArgumentNullException>(() => manager.RegisterSource(sourceName, exchangeSource));
    }
    public static IEnumerable<object?[]> RegisterSource_NullSourceName_Data => new List<object?[]> {
      new object?[] { null, null },
      new object?[] { null, new Mock<IExchangeSource>().Object },
    };

    [Theory, MemberData(nameof(RegisterSource_EmptyStringSourceName_Data))]
    public void RegisterSource_EmptyStringSourceName(string sourceName, IExchangeSource exchangeSource) {
      var manager = new ExchangeSourcesManager();
      Assert.Throws<System.ArgumentNullException>(() => manager.RegisterSource(sourceName, exchangeSource));
    }
    public static IEnumerable<object?[]> RegisterSource_EmptyStringSourceName_Data => new List<object?[]> {
      new object?[] { "", null },
      new object?[] { "", new Mock<IExchangeSource>().Object },
    };

    [Theory, MemberData(nameof(RegisterSource_NullSource_Data))]
    public void RegisterSource_NullSource(IExchangeSource exchangeSource) {
      var manager = new ExchangeSourcesManager();
      Assert.Throws<System.ArgumentNullException>(() => manager.RegisterSource("a", exchangeSource));
    }
    public static IEnumerable<object?[]> RegisterSource_NullSource_Data => new List<object?[]> {
      new object?[] { null }
    };

    [Theory, MemberData(nameof(GetRates_NullSourceName_Data))]
    public async void GetRates_NullSourceName(string sourceName) {
      var manager = new ExchangeSourcesManager();
      await Assert.ThrowsAsync<System.ArgumentNullException>(() => manager.GetExchangeRates(sourceName));
    }
    public static IEnumerable<object?[]> GetRates_NullSourceName_Data => new List<object?[]> {
      new object?[] { null }
    };

    [Fact]
    async public void GetRates_SourceIsNotFound() {
      var manager = new ExchangeSourcesManager();
      manager.RegisterSource("1", new Mock<IExchangeSource>().Object);
      manager.RegisterSource("2", new Mock<IExchangeSource>().Object);
      var ex = await Assert.ThrowsAsync<System.Exception>(() => manager.GetExchangeRates("3"));
      Assert.Contains("3", ex.Message);
    }

    [Fact]
    async public Task GetRates_BySourceName() {
      var source1 = new Mock<IExchangeSource>();
      var rates1 = new ExchangeRates(null);
      source1.Setup(source => source.getRates()).Returns(Task.FromResult<ExchangeRates>(rates1));

      var source2 = new Mock<IExchangeSource>();
      var rates2 = new ExchangeRates(null);
      source2.Setup(source => source.getRates()).Returns(Task.FromResult<ExchangeRates>(rates2));

      var manager = new ExchangeSourcesManager();
      manager.RegisterSource("1", source1.Object);
      manager.RegisterSource("2", source2.Object);

      ExchangeRates resultSource1 = await manager.GetExchangeRates("1");
      Assert.Equal(rates1, resultSource1);

      var resultSource2 = await manager.GetExchangeRates("2");
      Assert.Equal(rates2, resultSource2);
    }
  }
}
