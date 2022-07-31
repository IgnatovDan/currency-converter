﻿using System.Globalization;

using ExchangeConverter;
using CbrAdapter;

try {
  Console.OutputEncoding = System.Text.Encoding.UTF8; // Enable UTF8 to show RU chars in console and VSCode terminal
  
  RateSources.RegisterRatesSource("cbr", CbrRatesSource.Instance);
  // TODO: add new sources
  // RateSources.RegisterRatesSource(WebApiXmlRatesSource.Instance);
  // RateSources.RegisterRatesSource(WebApiJsonRatesSource.Instance);

  if (args.Length == 4) {
    var rates = await RateSources.GetRates(args[3]);
    var sourceCurrency = args[0];
    var amount = decimal.Parse(args[1], new NumberFormatInfo() { NumberDecimalSeparator = "," }); /* сценарии с разными разделителями не проверял */
    var targetCurrency = args[2];
    var newAmount = ExchangeConverter.Converter.Convert(sourceCurrency, amount, targetCurrency, rates);

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
