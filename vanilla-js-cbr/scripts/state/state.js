class Currency {
  constructor(name, charCode, value) {
    this.Name = name; // 'String', human readable name
    this.CharCode = charCode; // 'String', code
    this.Value = value; // 'Number' TODO: force convert to number
  }
  static RUB() {
    return new Currency("Российский рубль", "RUB", 1);
  }
}

class ExchangeRates {
  constructor(date, items) {
    this.Date = date;
    this.Items = items;
  }
}

function HandleValueNumberToZero(value) {
  if (Number.isNaN(value) || value === Infinity|| value === undefined || value === null) {
    return 0;
  }
  return value;
}
class State {
  constructor() {
    this.availableCurrencies = null;
    this.availableCurrenciesChanged = null;

    this.amount = 42;
    this.amountChanged = null;

    this.sourceCurrency = null;
    
    this.sourceCurrencyCharCode = null;
    this.sourceCurrencyCharCodeChanged = null;

    this.targetCurrency = null;

    this.targetCurrencyCharCode = null;
    this.targetCurrencyCharCodeChanged = null;

    this.targetAmount = 0;
    this.targetAmountChanged = null;

    this.targetRate = 0;
    this.targetRateChanged = null;
  }

  refreshTargetRate() {
    const newValue = HandleValueNumberToZero(this.targetCurrency?.Value);
    if (newValue !== this.targetRate) {
      this.targetRate = newValue;
      this.targetRateChanged?.();
    }
  }

  refreshTargetAmount() {
    let newValue =
      Math.round(
        (HandleValueNumberToZero(this.amount * this.sourceCurrency?.Value / this.targetCurrency?.Value) + Number.EPSILON)
        * 100) / 100;
    if (newValue !== this.targetAmount) {
      this.targetAmount = newValue;
      this.targetAmountChanged?.();
    }
  }

  setSourceCurrencyCharCode(newValue) {
    const newCurrency = this.availableCurrencies?.find(item => item.CharCode === newValue);
    if (newCurrency && this.sourceCurrencyCharCode !== newValue) {
      this.sourceCurrencyCharCode = newValue;
      this.sourceCurrency = newCurrency;
      this.sourceCurrencyCharCodeChanged?.();
      this.refreshTargetAmount();
    }
  }

  setTargetCurrencyCharCode(newValue) {
    const newCurrency = this.availableCurrencies?.find(item => item.CharCode === newValue);
    if (newCurrency && this.targetCurrencyCharCode !== newValue) {
      this.targetCurrencyCharCode = newValue;
      this.targetCurrency = newCurrency;
      this.targetCurrencyCharCodeChanged?.();
      this.refreshTargetAmount();
      this.refreshTargetRate();
    }
  }

  setAmount(amount) {
    const newValue = HandleValueNumberToZero(amount);
    if (this.amount !== newValue) {
      this.amount = newValue;
      this.amountChanged?.();
      this.refreshTargetAmount();
    }
  }

  setAvailableCurrencies(currencies) {
    if (this.availableCurrencies !== currencies) {
      this.availableCurrencies = currencies;
      this.availableCurrenciesChanged?.();
    }
  }
};
