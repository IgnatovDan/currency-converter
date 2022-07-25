// dotnet add package System.Text.Encoding
// dotnet run

try {
  // Enable UTF8 to show RU chars in console and VSCode terminal
  // (it tooks a half a day to find out what is going wrong with that '????' in VSCode terminal)
  Console.OutputEncoding = System.Text.Encoding.UTF8;
  var exchangeRates = await ConsoleToCBR.CRBUtils.GetExchangeRates();

  Console.WriteLine($"Total rates - {exchangeRates?.Items.Count}, rates date - {exchangeRates?.Date}");
  Console.WriteLine($"rates[0]: ID - {exchangeRates?.Items[0].ID}, Name - {exchangeRates?.Items[0].Name}");
}
catch (Exception e) {
  Console.WriteLine($"Error occurs: {e.Message}");
}
