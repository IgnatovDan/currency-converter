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

  #isLoading = true;
  #isLoadingChanged = new EventTarget();

  #exchangeRatesSource = "";
  #exchangeRatesSourceChanged = new EventTarget();
  #availableExchangeRateSources;

  constructor() {
    this.#availableExchangeRateSources = [
      { value: "demo", caption: "Демо данные" },
      { value: "cbr", caption: "Сайт Банка России" },
      { value: "web-api-proxy", caption: "Локальный сайт, прозрачный proxy на сайт Банка России" },
      { value: "web-api-json", caption: "Локальный сайт, данные с сайта Банка России в формате json" }
    ];

    this.#amount = 0;
    this.#availableCurrencies = [Currency.RUB()];
    this.#sourceCurrencyCharCode = this.#availableCurrencies[0].CharCode;
    this.#sourceCurrencyValue = this.#availableCurrencies[0].Value;
    this.#targetCurrencyCharCode = this.#availableCurrencies[0].CharCode;
    this.#targetCurrencyValue = this.#availableCurrencies[0].Value;
    this.setDemoDataMessage(`Демо данные`);
    this.setExchangeRatesSource("cbr");

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

  get isLoading() { return this.#isLoading; }
  get isLoadingChanged() { return this.#isLoadingChanged; }

  get exchangeRatesSource() { return this.#exchangeRatesSource; }
  get exchangeRatesSourceChanged() { return this.#exchangeRatesSourceChanged; }
  get availableExchangeRateSources() { return this.#availableExchangeRateSources; }

  refreshTargetRate() {
    const newValue = currencyConverter.getTargetRate(this.#sourceCurrencyValue, this.#targetCurrencyValue);
    if (newValue !== this.#targetRate) {
      this.#targetRate = newValue;
      this.#targetRateChanged.dispatchEvent();
    }
  }

  refreshTargetAmount() {
    const newValue = currencyConverter.getTargetAmount(this.#amount, this.#sourceCurrencyValue, this.#targetCurrencyValue);
    if (newValue !== this.#targetAmount) {
      this.#targetAmount = newValue;
      this.#targetAmountChanged.dispatchEvent();
    }
  }

  setSourceCurrencyCharCode(newValue) {
    const newCurrency = this.#availableCurrencies?.find(item => item.CharCode === newValue);
    if (this.#sourceCurrencyCharCode !== newValue || this.#sourceCurrencyValue != newCurrency?.Value) {
      this.#sourceCurrencyCharCode = newValue;
      this.#sourceCurrencyValue = newCurrency?.Value;
      this.#sourceCurrencyCharCodeChanged.dispatchEvent();
      this.refreshTargetAmount();
      this.refreshTargetRate();
    }
  }

  setTargetCurrencyCharCode(newValue) {
    const newCurrency = this.#availableCurrencies?.find(item => item.CharCode === newValue);
    if (this.#targetCurrencyCharCode !== newValue || this.#targetCurrencyValue !== newCurrency?.Value) {
      this.#targetCurrencyCharCode = newValue;
      this.#targetCurrencyValue = newCurrency?.Value;
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

  setExchangeRatesSource(newValue) {
    if (this.#exchangeRatesSource !== newValue) {
      this.#exchangeRatesSource = newValue;
      this.#exchangeRatesSourceChanged.dispatchEvent();

      this.setIsLoading(true);
      rateSourcesManager.getRates(this.#exchangeRatesSource).then((exchangeRates) => {
        /* TODO: signal: this.#abortLoadExchangeRatesController.signal */
        if (!exchangeRates.Items.find(item => item.CharCode === 'RUB')) {
          exchangeRates.Items.unshift(Currency.RUB());
        }

        if (this.#exchangeRatesSource === "demo") {
          this.setDemoDataMessage("Демо данные");
        } else {
          this.setDemoDataMessage(null);
        }
        this.setAvailableCurrencies(exchangeRates?.Items);
        this.setAmount(this.#amount || 42);
        this.setSourceCurrencyCharCode(this.#sourceCurrencyCharCode || 'RUB');
        if (state.forceChangeTargetCharCode) {
          this.setTargetCurrencyCharCode(state.forceChangeTargetCharCode);
          state.forceChangeTargetCharCode = null;
        } else {
          this.setTargetCurrencyCharCode(this.#targetCurrencyCharCode || 'USD');
        }
        this.setIsLoading(false);
      }).catch((error) => {
        console.log("Exchange rates loading was rejected: " + error);
        this.fillDemoData(error.message);
        this.setIsLoading(false);
      });
    }
  }

  setDemoDataMessage(newValue) {
    if (this.#demoDataMessage !== newValue) {
      this.#demoDataMessage = newValue;
      this.#demoDataMessageChanged.dispatchEvent();
    }
  }

  setIsLoading(newValue) {
    if (this.#isLoading !== newValue) {
      this.#isLoading = newValue;
      this.#isLoadingChanged.dispatchEvent();
    }
  }

  fillDemoData(demoDataReasonText) {
    const demoDataMessageTemplate = "При получении данных о курсе обмена валют возникла ошибка и показаны демонстрационные данные";

    rateSourcesManager.getRates("demo").then((exchangeRates) => {
      this.setAvailableCurrencies(exchangeRates.Items);
      this.setDemoDataMessage(`${demoDataMessageTemplate} (${demoDataReasonText})`);
      this.setAmount(this.#amount || 42);
      this.setSourceCurrencyCharCode(this.availableCurrencies[0].CharCode);
      this.setTargetCurrencyCharCode(this.availableCurrencies[1].CharCode);
    });
  }
};
