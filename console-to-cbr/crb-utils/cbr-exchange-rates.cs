using System.Xml;
using System.Xml.Serialization;

namespace ConsoleToCBR {
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
  public class ExchangeRates {
    [XmlAttribute]
    public string? name;
    [XmlAttribute]
    public string? Date; // TODO: parse as Date? 
    [XmlElement(typeof(Currency), ElementName = "Valute")]
    public List<Currency> Items { get; set; } = new List<Currency>();
  }

  public class Currency {
    [XmlAttribute]
    public string? ID;
    public string? Name;
    public string? NumCode;
    public string? CharCode;
    public string? Value;
  }
}
