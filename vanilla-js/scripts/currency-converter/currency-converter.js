const currencyConverter = {
  getTargetAmount: (amount, sourceCurrencyValue, targetCurrencyValue) => {
    return Math.round(
        (HandleValueNumberToZero(amount * sourceCurrencyValue / targetCurrencyValue) + Number.EPSILON)
        * 100) / 100;
  },
  getTargetRate: (sourceCurrencyValue, targetCurrencyValue) => {
    return Math.round((HandleValueNumberToZero(sourceCurrencyValue / targetCurrencyValue) + Number.EPSILON) * 10000) / 10000;
  },
}
