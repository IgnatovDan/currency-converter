// dotnet new console --framework net6.0
// dotnet run

try {
  // Enable UTF8 to show RU chars in console and VSCode terminal
  // (it tooks a half a day to find out what is going wrong with that '????' in VSCode terminal)
  Console.OutputEncoding = System.Text.Encoding.UTF8;
  var exchangeRates = await ConsoleToCBR.CRBUtils.GetExchangeRates();

  if (args.Length == 0) {
    Console.WriteLine("Arguments: source_currency_code amount target_currency_code");
    Console.WriteLine("For example: RUB 1000 USD");
  }
  Console.WriteLine($"Total rates available: {exchangeRates?.Items.Count}, rates date: {exchangeRates?.Date}");
  Console.WriteLine($"rates[0]: Code - {exchangeRates?.Items[0].CharCode}, Name - {exchangeRates?.Items[0].Name}");
}
catch (Exception e) {
  Console.WriteLine($"Error occurs: {e.Message}");
}
