using CurrencyConverter.ExchangeRateSources;
using CurrencyConverter.ExchangeRateSources.Cbr;

using Moq;

namespace CurrencyConverterTests {

  public class CbrRatesSourceTests {
    [Fact]
    public async void GetRates_NullFromAdapter() {
      var adapter = new Mock<ICbrRatesAdapter>();
      CbrRatesSource source = new CbrRatesSource(adapter.Object);
      ExchangeRates rates = await source.GetRates();
      Assert.Equal(0, rates.Items?.Count);
    }

    [Fact]
    public async void GetRates_ParseDate() {
      CbrExchangeRates sourceRates = new CbrExchangeRates();
      sourceRates.Date = "23.07.2022";
      var adapter = new Mock<ICbrRatesAdapter>();
      adapter.Setup(adapter => adapter.GetRates()).Returns(Task.FromResult<CbrExchangeRates>(sourceRates));

      CbrRatesSource source = new CbrRatesSource(adapter.Object);
      ExchangeRates rates = await source.GetRates();

      Assert.Equal(new DateTime(2022, 7, 23), rates.Date);
    }

    [Fact]
    public async void GetRates_ReadCbrCurrencies() {
      CbrExchangeRates sourceRates = new CbrExchangeRates();
      sourceRates.Items.Add(new CbrCurrency() { Name = "name1", CharCode = "charCode1", Value = "34,5678" });
      sourceRates.Items.Add(new CbrCurrency() { Name = "name2", CharCode = "charCode2", Value = "2,34" });

      var adapter = new Mock<ICbrRatesAdapter>();
      adapter.Setup(adapter => adapter.GetRates()).Returns(Task.FromResult<CbrExchangeRates>(sourceRates));

      CbrRatesSource source = new CbrRatesSource(adapter.Object);
      ExchangeRates rates = await source.GetRates();

      Assert.Equal(2, rates.Items?.Count);

      Currency? currency1 = rates.Items?[0];
      Assert.Equal("name1", currency1?.Name);
      Assert.Equal("charCode1", currency1?.CharCode);
      Assert.Equal(new Decimal(34.5678), currency1?.Value);

      Currency? currency2 = rates.Items?[1];
      Assert.Equal("name2", currency2?.Name);
      Assert.Equal("charCode2", currency2?.CharCode);
      Assert.Equal(new Decimal(2.34), currency2?.Value);
    }

    [Fact]
    public async void GetRates_IgnoreEmptyCurrencies() {
      CbrExchangeRates sourceRates = new CbrExchangeRates();
      sourceRates.Items.AddRange(new CbrCurrency[] {
      new CbrCurrency() { Name = "", CharCode = "charCode1", Value = "34,5678" },
      new CbrCurrency() { Name = "name2", CharCode = "", Value = "2,34" },
      new CbrCurrency() { Name = "name3", CharCode = "charCode3", Value = "" },
      new CbrCurrency() { Name = "name4", CharCode = "charCode4", Value = "0" }
    });

      var adapter = new Mock<ICbrRatesAdapter>();
      adapter.Setup(adapter => adapter.GetRates()).Returns(Task.FromResult<CbrExchangeRates>(sourceRates));

      CbrRatesSource source = new CbrRatesSource(adapter.Object);
      ExchangeRates rates = await source.GetRates();

      Assert.Equal(0, rates.Items?.Count);
    }
  }
}
