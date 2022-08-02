using System.Xml;
using System.Xml.Serialization;

namespace ExchangeSources.Cbr {
  /*
  https://www.cbr.ru/scripts/XML_daily.asp returns the following XML:
  
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
  public class CbrExchangeRates {
    [XmlAttribute]
    public string? name;
    [XmlAttribute]
    public string? Date; // TODO: parse as Date? 
    [XmlElement(typeof(CbrCurrency), ElementName = "Valute")]
    public List<CbrCurrency> Items { get; } = new List<CbrCurrency>();
  }

  public class CbrCurrency {
    [XmlAttribute]
    public string? ID;
    public string? Name;
    // https://en.wikipedia.org/wiki/ISO_4217
    public string? NumCode;
    public string? CharCode;
    public string? Value;
  }
}
