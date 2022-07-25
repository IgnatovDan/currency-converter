// dotnet add package System.Text.Encoding
// dotnet run

try {
  Console.OutputEncoding = System.Text.Encoding.UTF8;
  var exchangeRates = await ConsoleToCBR.CRBUtils.GetExchangeRates();

  Console.WriteLine($"Total rates - {exchangeRates?.Items.Count}, rates date - {exchangeRates?.Date}");
  Console.WriteLine($"rates[0]: ID - {exchangeRates?.Items[0].ID}, Name - {exchangeRates?.Items[0].Name}");
}
catch (Exception e) {
  Console.WriteLine($"Error occurs: {e.Message}");
}
