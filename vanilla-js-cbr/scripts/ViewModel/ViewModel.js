class ViewModel {
  static Bind(state) {
    ViewModel.updateForm();

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
        // TODO: curious optimisation
        // 'targetAmount' is recalculated twice and 'converter__target-amount' is update twice(one time for each call)
        //
        // 1. I can handle two repaints of 'converter__target-amount' via 'requestAnimationFrame/setTimeout(0)':
        //     it will move 'XXXChange' calls from the current call tree to the future calls queue.
        //
        // 2. 'targetAmount' recalculations should to be fast enough (no repains/DOM changes) and it doesn't worth it to optimize these calls
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
      'converter__demo-data-message_hidden', state.demoDataMessage && (state.demoDataMessage.length > 0));
  }
}
