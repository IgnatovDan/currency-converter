namespace Handlers;

public class ExchangeRates1251XmlHandler {
  public static string Handle(ICbrRatesProvider cbrRatesProvider) {
    return cbrRatesProvider.GetRatesXml();
  }
}
