using System.Net;
using System.Text;

using Moq;
using Moq.Protected;

using Handlers;

namespace web_api_test;

// Similar to currency-converter\console\currency-converter-tests\exchange-sources\cbr\cbr-exchange-rates-adapter-tests.cs 
public class TestCbrHttpClientFactory : ICbrHttpClientFactory {
  private string? responseMessageContent;
  private int responseEncodingCodePage;

  public TestCbrHttpClientFactory(
    string? responseMessageContent,
    int responseEncodingCodePage = 1251 /*1251 is used at https://www.cbr-xml-daily.ru/daily.xml*/
  ) {
    this.responseMessageContent = responseMessageContent;
    this.responseEncodingCodePage = responseEncodingCodePage;
  }

  public HttpClient CreateHttpClient() {
    // Emulate response message from https://www.cbr-xml-daily.ru/daily.xml
    HttpResponseMessage responseMessage;

    if (responseMessageContent == null) {
      responseMessage = new HttpResponseMessage() { StatusCode = HttpStatusCode.NoContent };
    }
    else {
      System.Text.Encoding.RegisterProvider(System.Text.CodePagesEncodingProvider.Instance); // for Encoding.GetEncoding(1251)
      Encoding encoding = Encoding.GetEncoding(this.responseEncodingCodePage);
      responseMessage = new HttpResponseMessage() {
        StatusCode = HttpStatusCode.OK,
        Content = new System.Net.Http.ByteArrayContent(encoding.GetBytes(responseMessageContent))
      };
      var mediaType = "application/xml";
      var charSet = "charset=" + encoding.HeaderName;
      responseMessage.Content.Headers.Add("content-type", $"{mediaType}; {charSet}");
    }

    var mockMessageHandler = new Mock<HttpMessageHandler>();
    mockMessageHandler.Protected()
        .Setup<Task<HttpResponseMessage>>("SendAsync", ItExpr.IsAny<HttpRequestMessage>(), ItExpr.IsAny<CancellationToken>())
        .ReturnsAsync(responseMessage);

    return new HttpClient(mockMessageHandler.Object);
  }
}
