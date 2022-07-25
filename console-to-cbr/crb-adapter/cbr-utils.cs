using System.Net;
using System.Text;
using System.Xml.Serialization;

namespace CRBAdapter {
  internal class Adapter {
    private static string ExchangesServiceUrl { get; } = "https://www.cbr.ru/scripts/XML_daily.asp";

    public static async Task<CBRExchangeRates> GetExchangeRates() {
      // https://stackoverflow.com/questions/32471058/windows-1252-is-not-supported-encoding-name/55434262#55434262
      // https://stackoverflow.com/questions/3967716/how-to-find-encoding-for-1251-codepage
      // dotnet add package System.Text.Encoding
      // dotnet add package System.Text.Encoding.CodePages
      System.Text.Encoding.RegisterProvider(System.Text.CodePagesEncodingProvider.Instance);

      // Aternative approach: work with xml elements directly
      // https://alekseev74.ru/lessons/show/aspnet-core-mvc/currency-converter-example
      // using System.Xml.Linq;
      // var xmlDoc = XDocument.Load(ExchangesServiceUrl);
      // var valueUSD = Convert.ToDecimal(xmlDoc.Elements("ValCurs").Elements("Valute").FirstOrDefault(x => x.Element("NumCode").Value == "840").Elements("Value").FirstOrDefault().Value);

      HttpClient client = new HttpClient();
      try {
        client.DefaultRequestHeaders.Clear();

        // https://www.cbr.ru/development/SXML/
        var response = await client.GetAsync(ExchangesServiceUrl);
        if (response.StatusCode == HttpStatusCode.NoContent) {
          // handle 'no content' as 'empty list'
          return new CBRExchangeRates();
        }
        else {
          if (response.IsSuccessStatusCode) {
            var charset = response.Content.Headers.ContentType?.CharSet;
            // Or, get 'encoding' from xml internals: <?xml version=""1.0"" encoding=""UTF-8""?>
            // https://stackoverflow.com/questions/34293196/obtaining-the-xml-encoding-from-an-xml-declaration-fragment-xmldeclaration-is-n
            var encoding = (charset != null) ? Encoding.GetEncoding(charset) : Encoding.UTF8;

            var bytes = await response.Content.ReadAsByteArrayAsync();
            var str = encoding.GetString(bytes);

            // Server returns data as an 'xml' string and I cannot use 'ReadFromJsonAsync':
            // var result = await res.Content.ReadFromJsonAsync<IEnumerable<CBRCurrency>>();

            XmlSerializer serializer = new XmlSerializer(typeof(CBRExchangeRates));
            using (StringReader reader = new StringReader(str)) {
              var result = serializer.Deserialize(reader) as CBRExchangeRates ?? new CBRExchangeRates();
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
