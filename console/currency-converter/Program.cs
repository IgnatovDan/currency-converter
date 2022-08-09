using System.Globalization;

using CurrencyConverter;
using CurrencyConverter.ExchangeRateSources;
using CurrencyConverter.ExchangeRateSources.Cbr;
using CurrencyConverter.ExchangeRateSources.WebApiXml;
using CurrencyConverter.ExchangeRateSources.WebApiJson;

try {
  Console.OutputEncoding = System.Text.Encoding.UTF8; // Enable UTF8 to show RU chars in console and VSCode terminal

  using (ExchangeSourcesManager rateSourcesManager = new ExchangeSourcesManager()) {
    rateSourcesManager.RegisterSource("cbr", new CbrRatesSource());
    rateSourcesManager.RegisterSource("web-api-proxy", new CbrRatesSource(WebApiXmlRatesSource.DefaultUrl));
    rateSourcesManager.RegisterSource("web-api-json", new WebApiJsonRatesSource());

    if (args.Length >= 3) {
      var sourceCurrency = args[0];
      var amount = decimal.Parse(
        args[1],
        new NumberFormatInfo() { NumberDecimalSeparator = "," }  /* fix delimiter to ',' independent on the current culture*/
      );
      var targetCurrency = args[2];
      var exchangeSourceName = (args.Length == 3) ? "cbr" : args[3];

      var rates = await rateSourcesManager.GetSource(exchangeSourceName).GetRates();
      rates.EnsureRUB();
      var newAmount = Converter.Convert(amount, rates.GetCurrency(sourceCurrency).Value, rates.GetCurrency(targetCurrency).Value);

      Console.WriteLine($"{newAmount}");
    }
    else {
      Console.WriteLine($"Incorrect arguments were passed: {String.Join(", ", args)}");
      Console.WriteLine("Expected arguments: source-currency-code amount target-currency-code exchange-rates-source");
      Console.WriteLine("For example: RUB 1000 USD cbr");
    }
  }
}
catch (Exception e) {
  Console.WriteLine($"Error occurs: {e.Message}");
}
