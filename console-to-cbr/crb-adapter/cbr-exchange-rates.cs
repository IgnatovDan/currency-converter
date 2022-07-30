using System.Xml;
using System.Xml.Serialization;

namespace CRBAdapter {
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
    public string? Date; // TODO: parse as Date? 
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
