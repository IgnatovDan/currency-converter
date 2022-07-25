// dotnet new console --framework net6.0
// https://docs.microsoft.com/ru-ru/dotnet/core/tools/dotnet-new-sdk-templates
// dotnet run

using System.Globalization;

try {
  // Enable UTF8 to show RU chars in console and VSCode terminal
  // (it tooks a half a day to find out what is going wrong with that '????' in VSCode terminal)
  Console.OutputEncoding = System.Text.Encoding.UTF8;
  var cbrRates = await CRBUtils.CRBUtils.GetExchangeRates();

  if (args.Length == 3) {
    var sourceCurrency = args[0];
    var amount = decimal.Parse(args[1], new NumberFormatInfo() { NumberDecimalSeparator = "," }); /* сценарии с разными разделителями не проверял */
    var targetCurrency = args[2];
    var newAmount = CRBUtils.Utils.Convert(
      sourceCurrency, amount, targetCurrency, CRBUtils.Utils.GetExchangeRatesFromCBR(cbrRates));

    Console.WriteLine($"{newAmount}");
  }
  else {
    Console.WriteLine($"Incorrect arguments were passed: {String.Join(", ", args)}");
    Console.WriteLine("Expected arguments: source_currency_code amount target_currency_code");
    Console.WriteLine("For example: RUB 1000 USD");

    Console.WriteLine($"Total rates available: {cbrRates?.Items.Count}, rates date: {cbrRates?.Date}");
    Console.WriteLine($"rates[0]: Code - {cbrRates?.Items[0].CharCode}, Name - {cbrRates?.Items[0].Name}");
  }
}
catch (Exception e) {
  Console.WriteLine($"Error occurs: {e.Message}");
}
