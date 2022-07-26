class UIModel {
  static Bind(state) {
    state.amountChanged = () => UIModel.updateSourceAmount(state);
    UIModel.updateSourceAmount(state);

    state.availableCurrenciesChanged = () => UIModel.updateSourceCurrency(state);
    state.sourceCurrencyCharCodeChanged = () => UIModel.updateSourceCurrency(state);
    UIModel.updateSourceCurrency(state);

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
      e => state.setAmount(Number(e.target.value)));
  }

  static updateSourceCurrency(state) {
    DOMUtils.SetSelectElementState(
      '.converter__source-currency > select',
      convertCurrenciesToSelectElementOptions(state.availableCurrencies),
      state.sourceCurrencyCharCode
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
    state.targetRateChanged = () => DOMUtils.SetElementText('.converter__target-rate', state.targetRate);
    DOMUtils.SetElementText('.converter__target-rate', state.targetRate);
  }

}
