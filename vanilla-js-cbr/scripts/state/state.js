class Currency {
  #name;
  #charCode;
  #value;

  constructor(name, charCode, value) {
    this.#name = name; // 'String', human readable name
    this.#charCode = charCode; // 'String', code
    this.#value = value; // 'Number' TODO: force convert to number
  }

  get Name() { return this.#name; }
  get CharCode() { return this.#charCode; }
  get Value() { return this.#value; }

  static RUB() { return new Currency("Российский рубль", "RUB", 1); }
  static USD() { return new Currency("Доллар США", "USD", 60.2198); }
  static GBP() { return new Currency("Фунт стерлингов Соединенного королевства", "GBP", 72.5287); }
}

class ExchangeRates {
  #date;
  #items;
  constructor(date, items) {
    this.#date = date;
    this.#items = items;
  }
  get Date() { return this.#date; }
  get Items() { return this.#items; }
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
  if (Number.isNaN(value) || value === Infinity || value === undefined || value === null) {
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

  #demoDataMessage = null;
  #demoDataMessageChanged = new EventTarget();

  constructor() {
    this.#amount = 42;
    this.#availableCurrencies = [Currency.RUB(), Currency.USD(), Currency.GBP()];
    this.#sourceCurrencyCharCode = this.#availableCurrencies[0].CharCode;
    this.#sourceCurrencyValue = this.#availableCurrencies[0].Value;
    this.#targetCurrencyCharCode = this.#availableCurrencies[1].CharCode;
    this.#targetCurrencyValue = this.#availableCurrencies[1].Value;
    this.refreshTargetAmount(this);
    this.refreshTargetRate(this);
  }

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

  get demoDataMessage() { return this.#demoDataMessage; }
  get demoDataMessageChanged() { return this.#demoDataMessageChanged; }

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

  setDemoDataMessage(newValue) {
    if (this.#demoDataMessage !== newValue) {
      this.#demoDataMessage = newValue;
      this.#demoDataMessageChanged.dispatchEvent();
    }
  }

  fillDemoData(demoDataReasonText) {
    const demoDataMessageTemplate = "При получении данных о курсе обмена валют возникла ошибка и показаны демонстрационные данные";
    state.setDemoDataMessage(`${demoDataMessageTemplate} (${demoDataReasonText})`);
    state.setAvailableCurrencies([Currency.RUB(), Currency.USD(), Currency.GBP()]);
    state.setAmount(42);
    state.setSourceCurrencyCharCode(state.availableCurrencies[0].CharCode);
    state.setTargetCurrencyCharCode(state.availableCurrencies[1].CharCode);
    return state;
  }
};
