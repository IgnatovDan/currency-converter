using System.Globalization;

try {
  // Enable UTF8 to show RU chars in console and VSCode terminal
  Console.OutputEncoding = System.Text.Encoding.UTF8;
  var cbrRates = await CbrAdapter.Adapter.GetExchangeRates();
  var rates = Utils.Utils.ConvertToExchangeRates(cbrRates);

  if (args.Length == 3) {
    var sourceCurrency = args[0];
    var amount = decimal.Parse(args[1], new NumberFormatInfo() { NumberDecimalSeparator = "," }); /* сценарии с разными разделителями не проверял */
    var targetCurrency = args[2];
    var newAmount = ExchangeConverter.Converter.Convert(sourceCurrency, amount, targetCurrency, rates);

    Console.WriteLine($"{newAmount}");
  }
  else {
    Console.WriteLine($"Incorrect arguments were passed: {String.Join(", ", args)}");
    Console.WriteLine("Expected arguments: source_currency_code amount target_currency_code");
    Console.WriteLine("For example: RUB 1000 USD");

    Console.WriteLine($"Total rates available: {rates?.Items.Count}, rates date: {rates?.Date}");
    Console.WriteLine($"rates[0]: Code - {rates?.Items[0].CharCode}, Name - {rates?.Items[0].Name}");
  }
}
catch (Exception e) {
  Console.WriteLine($"Error occurs: {e.Message}");
}
