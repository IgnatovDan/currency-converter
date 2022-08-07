using System.Net;
using System.Text;
using System.Xml.Serialization;

namespace CurrencyConverter.ExchangeRateSources.Cbr {
  //
  // https://www.cbr.ru/development/SXML/
  // This class is designed to work with the "https://www.cbr.ru/scripts/XML_daily.asp" service
  // Spike: https://github.com/IgnatovDan/Sandbox/blob/main/ASPNETCore/cbr-currencies-console/GetCurrencies_HttpClient_XmlSerializer_v3.cs
  //
  internal class Adapter {
    public static async Task<CbrExchangeRates> GetExchangeRates(string url) {
      System.Text.Encoding.RegisterProvider(System.Text.CodePagesEncodingProvider.Instance);

      HttpClient client = new HttpClient();
      try {
        client.DefaultRequestHeaders.Clear();

        // CancellationToken?
        var response = await client.GetAsync(url);
        if (response.StatusCode == HttpStatusCode.NoContent) {
          // handle 'no content' as 'empty list'
          return new CbrExchangeRates();
        }
        else {
          if (response.IsSuccessStatusCode) {
            var charset = response.Content.Headers.ContentType?.CharSet;
            var encoding = (charset != null) ? Encoding.GetEncoding(charset) : Encoding.UTF8;

            var bytes = await response.Content.ReadAsByteArrayAsync();
            var str = encoding.GetString(bytes);

            XmlSerializer serializer = new XmlSerializer(typeof(CbrExchangeRates));
            using (StringReader reader = new StringReader(str)) {
              var result = serializer.Deserialize(reader) as CbrExchangeRates ?? new CbrExchangeRates();
              return result;
            }
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
