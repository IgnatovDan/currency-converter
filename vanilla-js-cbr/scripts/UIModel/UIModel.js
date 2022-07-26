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

    DOMUtils.SetElementText('.conveter__result-amount', state.resultAmount);

    DOMUtils.SetElementText('.converter__target-currency-rate', state.targetCurrencyRate);
  }
}
