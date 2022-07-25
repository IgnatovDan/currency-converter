using System.Net;
using System.Text;
using System.Xml.Serialization;

namespace ConsoleToCBR {
  internal class CRBUtils {
    private static string ExchangesServiceUrl = "https://www.cbr.ru/scripts/XML_daily.asp";

    public static async Task<ExchangeRates?> GetExchangeRates() {
      // https://stackoverflow.com/questions/32471058/windows-1252-is-not-supported-encoding-name/55434262#55434262
      // https://stackoverflow.com/questions/3967716/how-to-find-encoding-for-1251-codepage
      // dotnet add package System.Text.Encoding
      // dotnet add package System.Text.Encoding.CodePages
      System.Text.Encoding.RegisterProvider(System.Text.CodePagesEncodingProvider.Instance);

      HttpClient client = new HttpClient();
      try {
        client.DefaultRequestHeaders.Clear();

        // https://www.cbr.ru/development/SXML/
        var response = await client.GetAsync(ExchangesServiceUrl);
        if (response.StatusCode == HttpStatusCode.NoContent) {
          // handle 'no content' as 'empty list'
          return new ExchangeRates();
        }
        else {
          if (response.IsSuccessStatusCode) {
            var charset = response.Content.Headers.ContentType?.CharSet;
            var encoding = (charset != null) ? Encoding.GetEncoding(charset) : Encoding.UTF8;

            var bytes = await response.Content.ReadAsByteArrayAsync();
            var str = encoding.GetString(bytes);

            XmlSerializer serializer = new XmlSerializer(typeof(ExchangeRates));
            using (StringReader reader = new StringReader(str)) {
              var result = serializer.Deserialize(reader) as ExchangeRates;
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
