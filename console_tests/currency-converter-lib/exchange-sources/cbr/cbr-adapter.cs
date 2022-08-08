using System.Net;
using System.Text;
using System.Xml.Serialization;

namespace CurrencyConverter.ExchangeRateSources.Cbr {
  //
  // https://www.cbr.ru/development/SXML/
  // This class is designed to work with the "https://www.cbr.ru/scripts/XML_daily.asp" service
  // Spike: https://github.com/IgnatovDan/Sandbox/blob/main/ASPNETCore/cbr-currencies-console/GetCurrencies_HttpClient_XmlSerializer_v3.cs
  //
  public class CbrExchangeRatesAdapter : ICbrRatesAdapter, IDisposable {
    private string cbrRatesUrl { get; }
    private HttpClient client { get; }

    public CbrExchangeRatesAdapter(string cbrRatesUrl!!) : this(new HttpClient(), cbrRatesUrl) {}
    public CbrExchangeRatesAdapter(HttpClient client!!, string cbrRatesUrl!!) {
      this.cbrRatesUrl = cbrRatesUrl;
      this.client = client;
    }

    public void Dispose() {
      this.client.Dispose();
    }

    public async Task<CbrExchangeRates> GetRates() {
      this.client.DefaultRequestHeaders.Clear();

      var response = await this.client.GetAsync(this.cbrRatesUrl);
      if (response.IsSuccessStatusCode) {
        var charset = response.Content.Headers.ContentType?.CharSet;
        var encoding = (charset != null) ? Encoding.GetEncoding(charset) : Encoding.UTF8;

        var bytes = await response.Content.ReadAsByteArrayAsync();
        System.Text.Encoding.RegisterProvider(System.Text.CodePagesEncodingProvider.Instance); // for encoding.GetString because string encoding is 1251
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
}
