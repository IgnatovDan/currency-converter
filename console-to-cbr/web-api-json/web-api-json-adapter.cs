using System.Net;
using System.Net.Http.Json;
using System.Text;

using ExchangeConverter;

namespace WebApiJson {
  //
  // This class is designed to work with the "https://localhost:7271/exchange-rates-utf.json" service,
  // see https://github.com/IgnatovDan/currency-converter/tree/master/my-web-api
  // Spike: https://github.com/IgnatovDan/Sandbox/blob/main/ASPNETCore/cbr-currencies-console/GetCurrencies_HttpClient_GetFromJsonAsync.cs
  //
  internal class WebApiJsonAdapter {
    public static async Task<IExchangeRates> GetExchangeRates(string url) {
      HttpClient client = new HttpClient();
      try {
        client.DefaultRequestHeaders.Clear();

        var response = await client.GetAsync(url);
        if (response.StatusCode == HttpStatusCode.NoContent) {
          // handle 'no content' as 'empty list'
          return new ExchangeRates();
        }
        else {
          if (response.IsSuccessStatusCode) {
            Encoding.RegisterProvider(CodePagesEncodingProvider.Instance);
            var result = await response.Content.ReadFromJsonAsync<ExchangeRates>();
            if (result == null) {
              return new ExchangeRates();
            }
            return result;
          }
          else {
            var message = await response.Content.ReadAsStringAsync();
            throw new Exception(message);
          }
        }
      }
      finally {
        client.Dispose();
      }
    }
  }
}
