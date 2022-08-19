import { HandleValueNumberToZero } from './utils';

function calculateTargetAmount(amount, sourceCurrencyValue, targetCurrencyValue) {
  const safeValue = HandleValueNumberToZero(amount * sourceCurrencyValue / targetCurrencyValue);
  return Math.round((safeValue + Number.EPSILON) * 100) / 100;
}

function calculateTargetRate(sourceCurrencyValue, targetCurrencyValue) {
  const safeValue = HandleValueNumberToZero(sourceCurrencyValue / targetCurrencyValue);
  return Math.round((safeValue + Number.EPSILON) * 10000) / 10000;
}

export {
  calculateTargetAmount,
  calculateTargetRate
}
