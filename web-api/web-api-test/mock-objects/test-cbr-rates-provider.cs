using Handlers;

namespace web_api_test;

public class TestCbrRatesProvider : ICbrRatesProvider {
  private string getRatesAsXml_Result = @"<ValCurs Date=""27.08.2022"" name=""Foreign Currency Market"">
<Valute ID=""R01235"">
<NumCode>840</NumCode>
<CharCode>USD</CharCode>
<Nominal>1</Nominal>
<Name>Доллар США</Name>
<Value>60,0924</Value>
</Valute>
</ValCurs>";

  public string GetRatesXml() {
    return this.getRatesAsXml_Result;
  }
}
