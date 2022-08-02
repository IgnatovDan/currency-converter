using System.Globalization;

using ExchangeSources;
using ExchangeSources.Cbr;
using ExchangeSources.WebApiXml;
using ExchangeSources.WebApiJson;

try {
  Console.OutputEncoding = System.Text.Encoding.UTF8; // Enable UTF8 to show RU chars in console and VSCode terminal

  RateSourcesManager.RegisterRatesSource("cbr", new CbrRatesSource());
  RateSourcesManager.RegisterRatesSource("web-api-proxy", new CbrRatesSource(WebApiXmlRatesSource.DefaultUrl));
  RateSourcesManager.RegisterRatesSource("web-api-json", new WebApiJsonRatesSource());

  if (args.Length >= 3) {
    var sourceCurrency = args[0];
    var amount = decimal.Parse(
      args[1],
      new NumberFormatInfo() { NumberDecimalSeparator = "," }  /* fix delimiter to ',' independing on the current culture*/
    );
    var targetCurrency = args[2];
    var exchangeSourceName = (args.Length == 3) ? "cbr" : args[3];

    var rates = await RateSourcesManager.GetRates(exchangeSourceName);
    rates.EnsureRUB();
    var newAmount = CurrencyConverter.Converter.Convert(sourceCurrency, amount, targetCurrency, rates.Items);

    Console.WriteLine($"{newAmount}");
  }
  else {
    Console.WriteLine($"Incorrect arguments were passed: {String.Join(", ", args)}");
    Console.WriteLine("Expected arguments: source-currency-code amount target-currency-code exchange-rates-source");
    Console.WriteLine("For example: RUB 1000 USD cbr");
  }
}
catch (Exception e) {
  Console.WriteLine($"Error occurs: {e.Message}");
}
