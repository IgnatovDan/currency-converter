class ViewModel {
  static Bind(state) {
    ViewModel.updateForm();

    state.isLoadingChanged.addEventListener(() => ViewModel.updateLoadingPanel(state));
    ViewModel.updateLoadingPanel(state);

    state.amountChanged.addEventListener(() => ViewModel.updateSourceAmount(state));
    ViewModel.updateSourceAmount(state);

    state.availableCurrenciesChanged.addEventListener(() => ViewModel.updateSourceCurrency(state));
    state.sourceCurrencyCharCodeChanged.addEventListener(() => ViewModel.updateSourceCurrency(state));
    ViewModel.updateSourceCurrency(state);

    ViewModel.UpdateCurrencyToggler(state);

    state.availableCurrenciesChanged.addEventListener(() => ViewModel.updateTargetCurrency(state));
    state.targetCurrencyCharCodeChanged.addEventListener(() => ViewModel.updateTargetCurrency(state));
    ViewModel.updateTargetCurrency(state);

    state.targetAmountChanged.addEventListener(() => ViewModel.updateTargetAmount(state));
    ViewModel.updateTargetAmount(state);

    state.sourceCurrencyCharCodeChanged.addEventListener(() => ViewModel.updateSourceRateCharCode(state));
    ViewModel.updateSourceRateCharCode(state);

    state.targetRateChanged.addEventListener(() => ViewModel.updateTargetRate(state));
    ViewModel.updateTargetRate(state);

    state.targetCurrencyCharCodeChanged.addEventListener(() => ViewModel.updateTargetRateCharCode(state));
    ViewModel.updateTargetRateCharCode(state);

    state.demoDataMessageChanged.addEventListener(() => ViewModel.updateDemoDataMessage(state));
    ViewModel.updateDemoDataMessage(state);

    state.exchangeRatesSourceChanged.addEventListener(() => ViewModel.updateExchangeRatesSource(state));
    ViewModel.updateExchangeRatesSource(state);
  }

  static updateForm() {
    DOMUtils.SetFormState(
      '.converter',
      e => e.preventDefault()
    );
  }

  static updateSourceAmount(state) {
    DOMUtils.SetNumberInputElementState(
      '.converter__source-amount',
      state.amount,
      e => state.setAmount(Number(e.target.value))
    );
  }

  static UpdateCurrencyToggler(state) {
    DOMUtils.SetButtonElementState(
      '.converter__currency-toggler',
      () => {
        const currentSourceCurrencyCharCode = state.sourceCurrencyCharCode;
        state.setSourceCurrencyCharCode(state.targetCurrencyCharCode);
        state.setTargetCurrencyCharCode(currentSourceCurrencyCharCode);
      }
    );
  }

  static updateSourceCurrency(state) {
    DOMUtils.SetSelectElementState(
      '.converter__source-currency > select',
      convertCurrenciesToSelectElementOptions(state.availableCurrencies),
      state.sourceCurrencyCharCode,
      e => state.setSourceCurrencyCharCode(e.target.value)
    );
  }

  static updateTargetCurrency(state) {
    DOMUtils.SetSelectElementState(
      '.converter__target-currency > select',
      convertCurrenciesToSelectElementOptions(state.availableCurrencies),
      state.targetCurrencyCharCode,
      e => state.setTargetCurrencyCharCode(e.target.value)
    );
  }

  static updateTargetAmount(state) {
    DOMUtils.SetElementText('.converter__target-amount', state.targetAmount);
  }

  static updateSourceRateCharCode(state) {
    DOMUtils.SetElementText('.rate-expression__item_source-rate-char-code', state.sourceCurrencyCharCode);
  }

  static updateTargetRateCharCode(state) {
    DOMUtils.SetElementText('.rate-expression__item_target-rate-char-code', state.targetCurrencyCharCode);
  }

  static updateTargetRate(state) {
    DOMUtils.SetElementText('.rate-expression__item_target-rate-value', state.targetRate);
  }

  static updateDemoDataMessage(state) {
    DOMUtils.SetElementText('.converter__demo-data-message', state.demoDataMessage);
    DOMUtils.ToggleElementClass('.converter__demo-data-message',
      'converter__demo-data-message_hidden', !state.demoDataMessage);
  }

  static updateLoadingPanel(state) {
    DOMUtils.ToggleElementClass('.converter__loading-panel',
      'loading-panel_hidden', !state.isLoading);
  }

  static updateExchangeRatesSource(state) {
    DOMUtils.SetSelectElementState(
      '.converter__rates_source',
      state.availableExchangeRateSources?.map(item => ({ value: item.value, text: item.caption })),
      state.exchangeRatesSource,
      e => state.setExchangeRatesSource(e.target.value)
    );
  }
}
