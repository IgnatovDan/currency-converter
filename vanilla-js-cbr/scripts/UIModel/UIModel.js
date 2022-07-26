class UIModel {
  static bind(state) {

    DOMUtils.SetInputElementState('.converter__source-amount', state.amount);

    DOMUtils.SetSelectElementState(
      '.converter__source-currency > select',
      convertCurrenciesToSelectElementOptions(state.availableCurrencies),
      state.sourceCurrencyCharCode
    );

    DOMUtils.SetSelectElementState(
      '.converter__target-currency > select',
      convertCurrenciesToSelectElementOptions(state.availableCurrencies),
      state.targetCurrencyCharCode
    );

    DOMUtils.SetElementText('.conveter__target-amount', state.targetAmount);

    DOMUtils.SetElementText('.converter__target-rate', state.targetCurrencyRate);
  }
}
