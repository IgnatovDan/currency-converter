namespace Proxies {

  //
  // Transparent proxy to https://www.cbr-xml-daily.ru/daily.xml
  // Returns full string, in the correct encoding
  // Spike: https://github.com/IgnatovDan/Sandbox/blob/main/ASPNETCore/cbr-currencies-proxy/proxies/transparent-proxy-return-stream-body.cs
  //
  public class ExchangeRatesXml1251 {
    public async static Task ProcessRequest(HttpContext context, string cbrXmlDailyUrl) {
      using (HttpClient client = new HttpClient()) {
        client.DefaultRequestHeaders.Clear();

        var requestMessage = new HttpRequestMessage();

        requestMessage.RequestUri = new Uri(cbrXmlDailyUrl);
        requestMessage.Method = new HttpMethod(context.Request.Method);

        using (var responseMessage = await client.SendAsync(requestMessage, HttpCompletionOption.ResponseHeadersRead, context.RequestAborted)) {
          context.Response.StatusCode = (int)responseMessage.StatusCode;
          foreach (var header in responseMessage.Headers) {
            context.Response.Headers[header.Key] = header.Value.ToArray();
          }

          foreach (var header in responseMessage.Content.Headers) {
            context.Response.Headers[header.Key] = header.Value.ToArray();
          }

          // SendAsync removes chunking from the response. This removes the header so it doesn't expect a chunked response.
          context.Response.Headers.Remove("transfer-encoding");

          using (var responseStream = await responseMessage.Content.ReadAsStreamAsync()) {
            await responseStream.CopyToAsync(context.Response.Body, 10000, context.RequestAborted);
          }
        }
      }
    }
  }
}
