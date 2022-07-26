class Currency {
  constructor(name, charCode, value) {
    this.Name = name;
    this.CharCode = charCode;
    this.Value = value;
  }
}

class ExchangeRates {
  constructor(date, items) {
    this.Date = date;
    this.Items = items;
  }
}

class State {
  constructor() {
    this.availableCurrencies = null;
    this.availableCurrenciesChanged = null;

    this.amount = 42;
    this.amountChanged = null;

    this.sourceCurrency = null;
    this.sourceCurrencyChanged = null;

    this.targetCurrency = null;
    this.targetCurrencyChanged = null;

    this.targetAmount = 0;
    this.targetAmountChanged = null;

    this.targetCurrencyRate = 0;
    this.targetCurrencyRateChanged = null;
  }

  refreshTargetCurrencyRate() {
    const newValue = this.targetCurrency?.Value;
    if (newValue !== this.targetCurrencyRate) {
      this.targetAmountRate = newValue;
      this.targetAmountRateChanged?.();
    }
  }

  refreshtargetAmount() {
    let newValue = this.amount * this.sourceCurrency?.Value / this.targetCurrency?.Value;
    if (Number.isNaN(newValue) || newValue === Infinity|| newValue === undefined || newValue === null) {
      newValue = 0;
    }
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
      this.refreshtargetAmount();
    }
  }

  setTargetCurrencyCharCode(newValue) {
    const newCurrency = this.availableCurrencies?.find(item => item.CharCode === newValue);
    if (newCurrency && this.targetCurrencyCharCode !== newValue) {
      this.targetCurrencyCharCode = newValue;
      this.targetCurrency = newCurrency;
      this.targetCurrencyCharCodeChanged?.();
      this.refreshtargetAmount();
      this.refreshTargetCurrencyRate();
    }
  }

  setAmount(amount) {
    if (this.amount !== amount) {
      this.amount = amount;
      this.amountChanged?.();
      this.refreshtargetAmount();
    }
  }

  setAvailableCurrencies(currencies) {
    if (this.availableCurrencies !== currencies) {
      this.availableCurrencies = currencies;
      this.availableCurrenciesChanged?.();
    }
  }
};
