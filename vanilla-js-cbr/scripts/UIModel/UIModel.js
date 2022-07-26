class UIModel {
  static Bind(state) {
    state.amountChanged = () => UIModel.updateSourceAmount(state);
    UIModel.updateSourceAmount(state);

    state.availableCurrenciesChanged = () => UIModel.updateSourceCurrency(state);
    state.sourceCurrencyCharCodeChanged = () => UIModel.updateSourceCurrency(state);
    UIModel.updateSourceCurrency(state);

    UIModel.UpdateCurrencyToggler(state);
    
    state.availableCurrenciesChanged = () => UIModel.updateTargetCurrency(state);
    state.targetCurrencyCharCodeChanged = () => UIModel.updateTargetCurrency(state);
    UIModel.updateTargetCurrency(state);

    state.targetAmountChanged = () => UIModel.updateTargetAmount(state);
    UIModel.updateTargetAmount(state);

    state.targetRateChanged = () => UIModel.updateTargetRate(state);
    UIModel.updateTargetRate(state);
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
        // 'targetAmount' is recalculated twice and 'conveter__target-amount' is update twice(one time for each call)
        //
        // 1. I can handle two repaints of 'conveter__target-amount' via 'requestAnimationFrame/setTimeout(0)':
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
      state.targetCurrencyCharCode
    );
  }

  static updateTargetAmount(state) {
    DOMUtils.SetElementText('.conveter__target-amount', state.targetAmount);
  }

  static updateTargetRate(state) {
    DOMUtils.SetElementText('.converter__target-rate', state.targetRate);
  }

}
