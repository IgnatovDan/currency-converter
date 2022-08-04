import { DOMUtils } from './dom-utils.js';
import { convertCurrenciesToSelectElementOptions } from './model-utils.js';

class ViewBinding {
  static Bind(model) {
    ViewBinding.updateForm();

    model.isLoadingChanged.addEventListener(() => ViewBinding.updateLoadingPanel(model));
    ViewBinding.updateLoadingPanel(model);

    model.amountChanged.addEventListener(() => ViewBinding.updateSourceAmount(model));
    ViewBinding.updateSourceAmount(model);

    model.availableCurrenciesChanged.addEventListener(() => ViewBinding.updateSourceCurrency(model));
    model.sourceCurrencyCharCodeChanged.addEventListener(() => ViewBinding.updateSourceCurrency(model));
    ViewBinding.updateSourceCurrency(model);

    ViewBinding.UpdateCurrencyToggler(model);

    model.availableCurrenciesChanged.addEventListener(() => ViewBinding.updateTargetCurrency(model));
    model.targetCurrencyCharCodeChanged.addEventListener(() => ViewBinding.updateTargetCurrency(model));
    ViewBinding.updateTargetCurrency(model);

    model.targetAmountChanged.addEventListener(() => ViewBinding.updateTargetAmount(model));
    ViewBinding.updateTargetAmount(model);

    model.sourceCurrencyCharCodeChanged.addEventListener(() => ViewBinding.updateSourceRateCharCode(model));
    ViewBinding.updateSourceRateCharCode(model);

    model.targetRateChanged.addEventListener(() => ViewBinding.updateTargetRate(model));
    ViewBinding.updateTargetRate(model);

    model.targetCurrencyCharCodeChanged.addEventListener(() => ViewBinding.updateTargetRateCharCode(model));
    ViewBinding.updateTargetRateCharCode(model);

    model.demoDataMessageChanged.addEventListener(() => ViewBinding.updateDemoDataMessage(model));
    ViewBinding.updateDemoDataMessage(model);

    model.exchangeRatesSourceChanged.addEventListener(() => ViewBinding.updateExchangeRatesSource(model));
    ViewBinding.updateExchangeRatesSource(model);
  }

  static updateForm() {
    DOMUtils.SetFormState(
      '.converter',
      e => e.preventDefault()
    );
  }

  static updateSourceAmount(model) {
    DOMUtils.SetNumberInputElementState(
      '.converter__source-amount',
      model.amount,
      e => model.setAmount(Number(e.target.value))
    );
  }

  static UpdateCurrencyToggler(model) {
    DOMUtils.SetButtonElementState(
      '.converter__currency-toggler',
      () => {
        const currentSourceCurrencyCharCode = model.sourceCurrencyCharCode;
        model.setSourceCurrencyCharCode(model.targetCurrencyCharCode);
        model.setTargetCurrencyCharCode(currentSourceCurrencyCharCode);
      }
    );
  }

  static updateSourceCurrency(model) {
    DOMUtils.SetSelectElementState(
      '.converter__source-currency > select',
      convertCurrenciesToSelectElementOptions(model.availableCurrencies),
      model.sourceCurrencyCharCode,
      e => model.setSourceCurrencyCharCode(e.target.value)
    );
  }

  static updateTargetCurrency(model) {
    DOMUtils.SetSelectElementState(
      '.converter__target-currency > select',
      convertCurrenciesToSelectElementOptions(model.availableCurrencies),
      model.targetCurrencyCharCode,
      e => model.setTargetCurrencyCharCode(e.target.value)
    );
  }

  static updateTargetAmount(model) {
    DOMUtils.SetElementText('.converter__target-amount', model.targetAmount);
  }

  static updateSourceRateCharCode(model) {
    DOMUtils.SetElementText('.rate-expression__item_source-rate-char-code', model.sourceCurrencyCharCode);
  }

  static updateTargetRateCharCode(model) {
    DOMUtils.SetElementText('.rate-expression__item_target-rate-char-code', model.targetCurrencyCharCode);
  }

  static updateTargetRate(model) {
    DOMUtils.SetElementText('.rate-expression__item_target-rate-value', model.targetRate);
  }

  static updateDemoDataMessage(model) {
    DOMUtils.SetElementText('.converter__demo-data-message', model.demoDataMessage);
    DOMUtils.ToggleElementClass('.converter__demo-data-message',
      'converter__demo-data-message_hidden', !model.demoDataMessage);
  }

  static updateLoadingPanel(model) {
    DOMUtils.ToggleElementClass('.converter__loading-panel',
      'loading-panel_hidden', !model.isLoading);
  }

  static updateExchangeRatesSource(model) {
    DOMUtils.SetSelectElementState(
      '.converter__rates_source',
      model.availableExchangeRateSources?.map(item => ({ value: item.value, text: item.caption })),
      model.exchangeRatesSource,
      e => model.setExchangeRatesSource(e.target.value)
    );
  }
}

export { ViewBinding }
