namespace Handlers;

public class ExchangeRates1251XmlHandler {
  public async static Task Handle(HttpContext context, ICbrHttpClientFactory cbrHttpClientFactory, string cbrXmlDailyUrl) {
    using (var client = cbrHttpClientFactory.CreateHttpClient()) {
      using (var responseMessage = await client.GetAsync(cbrXmlDailyUrl, HttpCompletionOption.ResponseHeadersRead, context.RequestAborted)) {
        context.Response.StatusCode = (int)responseMessage.StatusCode;
        foreach (var header in responseMessage.Headers) {
          context.Response.Headers[header.Key] = header.Value.ToArray();
        }

        foreach (var header in responseMessage.Content.Headers) {
          context.Response.Headers[header.Key] = header.Value.ToArray();
        }

        using (var responseStream = await responseMessage.Content.ReadAsStreamAsync()) {
          await responseStream.CopyToAsync(context.Response.Body, 10000, context.RequestAborted);
        }
      }
    }
  }
}
