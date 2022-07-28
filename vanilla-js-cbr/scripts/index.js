const state = new State();

LoadExchangeRates().then((exchangeRates) => {
  state.setAvailableCurrencies(exchangeRates?.Items);
  state.setAmount(42);
  state.setSourceCurrencyCharCode('RUB');
  state.setTargetCurrencyCharCode('USD');
}).catch((error) => {
  console.log("Exchange rates loading was rejected: " + error);
  state.fillDemoData(error.message);
  /* TODO: show error message and disable editors */
});

document.addEventListener("DOMContentLoaded", () => {
  // handler is required because "script defer" content is executed before "DOMContentLoaded"
  // while "ViewModel.bind" requires a complete DOM tree
  ViewModel.Bind(state);
});
