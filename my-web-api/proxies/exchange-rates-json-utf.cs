using System.Net;
using System.Text;
using System.Text.Encodings.Web;
using System.Text.Json;
using System.Text.Unicode;
using System.Xml.Serialization;

namespace ExchangeRatesJsonUtf {

  //
  // Convert result from https://www.cbr-xml-daily.ru/daily.xml into JSON
  //
  public class Main {
    private static async Task<CBRExchangeRates> ReadCbrExchangeRates(string cbrXmlDailyUrl) {
      using (HttpClient client = new HttpClient()) {
        client.DefaultRequestHeaders.Clear();

        // CancellationToken?
        var response = await client.GetAsync(cbrXmlDailyUrl);
        if (response.StatusCode == HttpStatusCode.NoContent) {
          return new CBRExchangeRates();
        }
        else {
          if (response.IsSuccessStatusCode) {
            // for 'Encoding.GetEncoding': System.ArgumentException: 'windows-1251' is not a supported encoding name.
            System.Text.Encoding.RegisterProvider(System.Text.CodePagesEncodingProvider.Instance);

            var charset = response.Content.Headers.ContentType?.CharSet;
            var encoding = (charset != null) ? Encoding.GetEncoding(charset) : Encoding.UTF8;

            var bytes = await response.Content.ReadAsByteArrayAsync();
            var str = encoding.GetString(bytes);

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

    }
    public async static Task ProcessRequest(HttpContext context, string cbrXmlDailyUrl) {
      CBRExchangeRates cbrRates = await ReadCbrExchangeRates(cbrXmlDailyUrl);
      await context.Response.WriteAsJsonAsync(
        cbrRates,
        new JsonSerializerOptions {
          WriteIndented = true,
          IncludeFields = true,
          Encoder = JavaScriptEncoder.Create(UnicodeRanges.BasicLatin, UnicodeRanges.Cyrillic) // JavaScriptEncoder.UnsafeRelaxedJsonEscaping
        }
      );
    }
  }

  /*
    https://www.cbr.ru/scripts/XML_daily.asp

    <ValCurs Date="23.07.2022" name="Foreign Currency Market">
      <Valute ID="R01010">
        <NumCode>036</NumCode>
        <CharCode>AUD</CharCode>
        <Nominal>1</Nominal>
        <Name>Австралийский доллар</Name>
        <Value>39,6347</Value>
      </Valute>
  */

  [XmlRootAttribute("ValCurs")]
  public class CBRExchangeRates {
    [XmlAttribute]
    public string? name;
    [XmlAttribute]
    public string? Date; // TODO: parse/serialize as Date? 
    [XmlElement(typeof(CBRCurrency), ElementName = "Valute")]
    public List<CBRCurrency> Items { get; } = new List<CBRCurrency>();
  }

  public class CBRCurrency {
    [XmlAttribute]
    public string? ID;
    public string? Name;
    // https://en.wikipedia.org/wiki/ISO_4217
    public string? NumCode;
    public string? CharCode;
    public string? Value;
  }
}
