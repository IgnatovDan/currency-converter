using System.Net;
using System.Text;

using Moq;
using Moq.Protected;

using Handlers;

namespace web_api_test;

// Similar to currency-converter\console\currency-converter-tests\exchange-sources\cbr\cbr-exchange-rates-adapter-tests.cs 
public class TestCbrHttpClientFactory : ICbrHttpClientFactory {
  private HttpResponseMessage responseMessage;

  private static HttpResponseMessage CreateHttpResponseMessage(int codePage, string content) {
    if (codePage == 1251) {
      System.Text.Encoding.RegisterProvider(System.Text.CodePagesEncodingProvider.Instance); // required for Encoding.GetEncoding(1251)
    }
    Encoding encoding = Encoding.GetEncoding(codePage);
    var responseMessage = new HttpResponseMessage() {
      StatusCode = HttpStatusCode.OK,
      Content = new System.Net.Http.ByteArrayContent(encoding.GetBytes(content))
    };
    var mediaType = "application/xml";
    var charSet = "charset=" + encoding.HeaderName;
    responseMessage.Content.Headers.Add("content-type", $"{mediaType}; {charSet}");
    return responseMessage;
  }

  public TestCbrHttpClientFactory(HttpResponseMessage responseMessage) {
    this.responseMessage = responseMessage;
  }

  public TestCbrHttpClientFactory(int codePage, string content) : this(CreateHttpResponseMessage(codePage, content)) {}
  
  public HttpClient CreateHttpClient() {
    // Emulate response message from https://www.cbr-xml-daily.ru/daily.xml

    var mockMessageHandler = new Mock<HttpMessageHandler>();
    mockMessageHandler.Protected()
        .Setup<Task<HttpResponseMessage>>("SendAsync", ItExpr.IsAny<HttpRequestMessage>(), ItExpr.IsAny<CancellationToken>())
        .ReturnsAsync(this.responseMessage);

    return new HttpClient(mockMessageHandler.Object);
  }
}
