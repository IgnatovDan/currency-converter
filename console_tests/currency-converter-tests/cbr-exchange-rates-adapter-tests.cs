using System.Net;
using System.Text;

using CurrencyConverter;
using CurrencyConverter.ExchangeRateSources.Cbr;

using Moq;
using Moq.Protected;

namespace CurrencyConverterTests {

  public class CbrExchangeRatesAdapterTests {
    const string cbrSiteReplyExampleTwoCurrencies =
  @"<?xml version=""1.0"" encoding=""windows-1251""?>
<ValCurs Date=""06.08.2022"" name=""Foreign Currency Market"">
  <Valute ID=""R01010"">
    <NumCode>036</NumCode>
    <CharCode>AUD</CharCode>
    <Nominal>1</Nominal>
    <Name>Австралийский доллар</Name>
    <Value>42,0655</Value>
  </Valute>
  <Valute ID=""R01235"">
    <NumCode>840</NumCode>
    <CharCode>USD</CharCode>
    <Nominal>1</Nominal>
    <Name>Доллар США</Name>
    <Value>60,3696</Value>
  </Valute>
</ValCurs>";


    [Fact]
    public async void GetRates() {
      //Arrange

      System.Text.Encoding.RegisterProvider(System.Text.CodePagesEncodingProvider.Instance); // for Encoding.GetEncoding(1251)

      var responseMessage = new HttpResponseMessage() {
        StatusCode = HttpStatusCode.OK,
        Content = new System.Net.Http.ByteArrayContent(Encoding.GetEncoding(1251).GetBytes(cbrSiteReplyExampleTwoCurrencies)),
      };
      responseMessage.Content.Headers.Add("content-type", "application/xml; charset=windows-1251");

      var mockMessageHandler = new Mock<HttpMessageHandler>();
      mockMessageHandler.Protected()
          .Setup<Task<HttpResponseMessage>>("SendAsync", ItExpr.IsAny<HttpRequestMessage>(), ItExpr.IsAny<CancellationToken>())
          .ReturnsAsync(responseMessage);

      using (var adapter = new CbrExchangeRatesAdapter(new HttpClient(mockMessageHandler.Object), "https://www.dummy.ru/")) {
        //Act

        var data = await adapter.GetRates();

        //Assert

        Assert.Equal("06.08.2022", data.Date);
        Assert.Equal(2, data.Items.Count);

        Assert.Equal("Австралийский доллар", data.Items[0].Name);
        Assert.Equal("AUD", data.Items[0].CharCode);
        Assert.Equal("42,0655", data.Items[0].Value);

        Assert.Equal("Доллар США", data.Items[1].Name);
        Assert.Equal("USD", data.Items[1].CharCode);
        Assert.Equal("60,3696", data.Items[1].Value);
      }
    }
  }
}
