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
  #listeners = [];

  addEventListener(listener) {
    if (!this.#listeners.some(item => item === listener)) {
      this.#listeners.push(listener);
    }
  }
  dispatchEvent(args) {
    this.#listeners.forEach(listener => listener(args));
  }
}

function HandleValueNumberToZero(value) {
  if (Number.isNaN(value) || value === Infinity|| value === undefined || value === null) {
    return 0;
  }
  return value;
}

class State {
  #availableCurrencies = null;
  #availableCurrenciesChanged = new EventTarget();

  #amount = 42;
  #amountChanged = new EventTarget();

  #sourceCurrencyValue = null;
  #sourceCurrencyCharCode = null;
  #sourceCurrencyCharCodeChanged = new EventTarget();

  #targetCurrencyValue = null;
  #targetCurrencyCharCode = null;
  #targetCurrencyCharCodeChanged = new EventTarget();

  #targetAmount = 0;
  #targetAmountChanged = new EventTarget();

  #targetRate = 0;
  #targetRateChanged = new EventTarget();

  get availableCurrencies() { return this.#availableCurrencies; }
  get availableCurrenciesChanged() { return this.#availableCurrenciesChanged; }

  get amount() { return this.#amount; }
  get amountChanged() { return this.#amountChanged; }

  get sourceCurrencyCharCode() { return this.#sourceCurrencyCharCode; }
  get sourceCurrencyCharCodeChanged() { return this.#sourceCurrencyCharCodeChanged; }

  get targetCurrencyCharCode() { return this.#targetCurrencyCharCode; }
  get targetCurrencyCharCodeChanged() { return this.#targetCurrencyCharCodeChanged; }
  
  get targetAmount() { return this.#targetAmount; }
  get targetAmountChanged() { return this.#targetAmountChanged; }

  get targetRate() { return this.#targetRate; }
  get targetRateChanged() { return this.#targetRateChanged; }  

  refreshTargetRate() {
    const newValue =
      Math.round((HandleValueNumberToZero(this.#sourceCurrencyValue / this.#targetCurrencyValue) + Number.EPSILON) * 10000) / 10000;
    if (newValue !== this.#targetRate) {
      this.#targetRate = newValue;
      this.#targetRateChanged.dispatchEvent();
    }
  }

  refreshTargetAmount() {
    let newValue =
      Math.round(
        (HandleValueNumberToZero(this.#amount * this.#sourceCurrencyValue / this.#targetCurrencyValue) + Number.EPSILON)
        * 100) / 100;
    if (newValue !== this.#targetAmount) {
      this.#targetAmount = newValue;
      this.#targetAmountChanged.dispatchEvent();
    }
  }

  setSourceCurrencyCharCode(newValue) {
    const newCurrency = this.#availableCurrencies?.find(item => item.CharCode === newValue);
    if (newCurrency && this.sourceCurrencyCharCode !== newValue) {
      this.#sourceCurrencyCharCode = newValue;
      this.#sourceCurrencyValue = newCurrency.Value;
      this.#sourceCurrencyCharCodeChanged.dispatchEvent();
      this.refreshTargetAmount();
    }
  }

  setTargetCurrencyCharCode(newValue) {
    const newCurrency = this.#availableCurrencies?.find(item => item.CharCode === newValue);
    if (newCurrency && this.#targetCurrencyCharCode !== newValue) {
      this.#targetCurrencyCharCode = newValue;
      this.#targetCurrencyValue = newCurrency.Value;
      this.#targetCurrencyCharCodeChanged.dispatchEvent();
      this.refreshTargetAmount();
      this.refreshTargetRate();
    }
  }

  setAmount(amount) {
    const newValue = HandleValueNumberToZero(amount);
    if (this.#amount !== newValue) {
      this.#amount = newValue;
      this.#amountChanged.dispatchEvent();
      this.refreshTargetAmount();
    }
  }

  setAvailableCurrencies(currencies) {
    if (this.#availableCurrencies !== currencies) {
      this.#availableCurrencies = currencies;
      this.#availableCurrenciesChanged.dispatchEvent();
    }
  }
};
