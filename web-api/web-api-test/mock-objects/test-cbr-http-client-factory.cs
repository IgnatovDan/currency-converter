using System.Net;
using System.Text;

using Moq;
using Moq.Protected;

using Handlers;

namespace web_api_test;

// Similar to currency-converter\console\currency-converter-tests\exchange-sources\cbr\cbr-exchange-rates-adapter-tests.cs 
public class TestCbrHttpClientFactory : ICbrHttpClientFactory {
  private string responseMessageContent;

  public TestCbrHttpClientFactory(string responseMessageContent) {
    this.responseMessageContent = responseMessageContent;
  }

  public HttpClient CreateHttpClient() {
    System.Text.Encoding.RegisterProvider(System.Text.CodePagesEncodingProvider.Instance); // for Encoding.GetEncoding(1251)

    // Emulate response message from https://www.cbr-xml-daily.ru/daily.xml
    var responseMessage = new HttpResponseMessage() {
      StatusCode = HttpStatusCode.OK,
      Content = new System.Net.Http.ByteArrayContent(Encoding.GetEncoding(1251).GetBytes(responseMessageContent)),
    };
    responseMessage.Content.Headers.Add("content-type", "application/xml; charset=windows-1251");

    var mockMessageHandler = new Mock<HttpMessageHandler>();
    mockMessageHandler.Protected()
        .Setup<Task<HttpResponseMessage>>("SendAsync", ItExpr.IsAny<HttpRequestMessage>(), ItExpr.IsAny<CancellationToken>())
        .ReturnsAsync(responseMessage);

    return new HttpClient(mockMessageHandler.Object);
  }
}
