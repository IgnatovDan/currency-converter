import { handleValueNumberToZero } from '../utils/utils.js';

class CurrencyConverter {
  static getTargetAmount(amount, sourceCurrencyValue, targetCurrencyValue) {
    return Math.round(
      (handleValueNumberToZero(amount * sourceCurrencyValue / targetCurrencyValue) + Number.EPSILON)
      * 100) / 100;
  }

  static getTargetRate(sourceCurrencyValue, targetCurrencyValue) {
    return Math.round((handleValueNumberToZero(sourceCurrencyValue / targetCurrencyValue) + Number.EPSILON) * 10000) / 10000;
  }
}

export { CurrencyConverter }
