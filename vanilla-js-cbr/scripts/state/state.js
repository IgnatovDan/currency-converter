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

class EventTarget {
  constructor() {
    this.listeners = [];
  }
  addEventListener(listener) {
    if (!this.listeners.some(item => item === listener)) {
      this.listeners.push(listener);
    }
  }
  dispatchEvent(args) {
    this.listeners.forEach(listener => listener(args));
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
    this.availableCurrenciesChanged = new EventTarget();

    this.amount = 42;
    this.amountChanged = new EventTarget();

    this.sourceCurrencyValue = null;
    
    this.sourceCurrencyCharCode = null;
    this.sourceCurrencyCharCodeChanged = new EventTarget();

    this.targetCurrencyValue = null;

    this.targetCurrencyCharCode = null;
    this.targetCurrencyCharCodeChanged = new EventTarget();

    this.targetAmount = 0;
    this.targetAmountChanged = new EventTarget();

    this.targetRate = 0;
    this.targetRateChanged = new EventTarget();
  }

  refreshTargetRate() {
    const newValue =
      Math.round((HandleValueNumberToZero(this.sourceCurrencyValue / this.targetCurrencyValue) + Number.EPSILON) * 10000) / 10000;
    if (newValue !== this.targetRate) {
      this.targetRate = newValue;
      this.targetRateChanged.dispatchEvent();
    }
  }

  refreshTargetAmount() {
    let newValue =
      Math.round(
        (HandleValueNumberToZero(this.amount * this.sourceCurrencyValue / this.targetCurrencyValue) + Number.EPSILON)
        * 100) / 100;
    if (newValue !== this.targetAmount) {
      this.targetAmount = newValue;
      this.targetAmountChanged.dispatchEvent();
    }
  }

  setSourceCurrencyCharCode(newValue) {
    const newCurrency = this.availableCurrencies?.find(item => item.CharCode === newValue);
    if (newCurrency && this.sourceCurrencyCharCode !== newValue) {
      this.sourceCurrencyCharCode = newValue;
      this.sourceCurrencyValue = newCurrency.Value;
      this.sourceCurrencyCharCodeChanged.dispatchEvent();
      this.refreshTargetAmount();
    }
  }

  setTargetCurrencyCharCode(newValue) {
    const newCurrency = this.availableCurrencies?.find(item => item.CharCode === newValue);
    if (newCurrency && this.targetCurrencyCharCode !== newValue) {
      this.targetCurrencyCharCode = newValue;
      this.targetCurrencyValue = newCurrency.Value;
      this.targetCurrencyCharCodeChanged.dispatchEvent();
      this.refreshTargetAmount();
      this.refreshTargetRate();
    }
  }

  setAmount(amount) {
    const newValue = HandleValueNumberToZero(amount);
    if (this.amount !== newValue) {
      this.amount = newValue;
      this.amountChanged.dispatchEvent();
      this.refreshTargetAmount();
    }
  }

  setAvailableCurrencies(currencies) {
    if (this.availableCurrencies !== currencies) {
      this.availableCurrencies = currencies;
      this.availableCurrenciesChanged.dispatchEvent();
    }
  }
};
