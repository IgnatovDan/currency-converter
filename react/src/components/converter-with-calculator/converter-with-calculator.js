import { useCallback, useEffect, useState } from 'react';
import ConverterUI from '../converter-ui/converter-ui.js';

import { Currency } from '../../api/exchange-sources/exchange-rates-data-objects';

function HandleValueNumberToZero(value) {
  if (Number.isNaN(value) || value === Infinity || value === undefined || value === null) {
    return 0;
  }
  return value;
}

function handleIncorrectCharCode(charCode, availableCurrencies, defaultCharCode) {
  if (!charCode || !availableCurrencies?.find(item => item.CharCode === charCode)) {
    if (availableCurrencies?.find(item => item.CharCode === defaultCharCode)) {
      return defaultCharCode;
    }
    else if(availableCurrencies.length) {
      return availableCurrencies[0].CharCode;
    }
  }
  return charCode;
}

function ConverterWithCalculator({
  classes,
  availableExchangeRateSources,
  exchangeRatesSourceKey,
  isLoading,
  warningMessage,
  availableCurrencies,
  exchangeRatesSourceKeyChanged,
  defaultSourceCurrencyCharCode,
  defaultTargetCurrencyCharCode }) {

  const [amount, setAmount] = useState(4000);
  const [targetAmount, setTargetAmount] = useState(0);
  const [targetRate, setTargetRate] = useState(0);
  const [sourceCurrencyValue, setSourceCurrencyValue] = useState(0);
  const [sourceCurrencyCharCode, setSourceCurrencyCharCode] = useState();
  const [targetCurrencyValue, setTargetCurrencyValue] = useState(0);
  const [targetCurrencyCharCode, setTargetCurrencyCharCode] = useState();

  useEffect(() => {
    setSourceCurrencyCharCode(handleIncorrectCharCode(sourceCurrencyCharCode, availableCurrencies, defaultSourceCurrencyCharCode));
  }, [sourceCurrencyCharCode, availableCurrencies, defaultSourceCurrencyCharCode]);

  useEffect(() => {
    setTargetCurrencyCharCode(handleIncorrectCharCode(targetCurrencyCharCode, availableCurrencies, defaultTargetCurrencyCharCode));
  }, [targetCurrencyCharCode, availableCurrencies, defaultTargetCurrencyCharCode]);

  useEffect(() => {
    const newCurrency = availableCurrencies?.find(item => item.CharCode === sourceCurrencyCharCode);
    setSourceCurrencyValue(newCurrency?.Value);
  }, [availableCurrencies, sourceCurrencyCharCode]);

  useEffect(() => {
    const newCurrency = availableCurrencies?.find(item => item.CharCode === targetCurrencyCharCode);
    setTargetCurrencyValue(newCurrency?.Value);
  }, [availableCurrencies, targetCurrencyCharCode]);

  useEffect(() => {
    const safeValue = HandleValueNumberToZero(amount * sourceCurrencyValue / targetCurrencyValue);
    setTargetAmount(Math.round((safeValue + Number.EPSILON) * 100) / 100);
  }, [amount, sourceCurrencyValue, targetCurrencyValue]);

  useEffect(() => {
    const safeValue = HandleValueNumberToZero(sourceCurrencyValue / targetCurrencyValue);
    setTargetRate(Math.round((safeValue + Number.EPSILON) * 10000) / 10000);
  }, [sourceCurrencyValue, targetCurrencyValue]);

  const amountChanged = useCallback(value => setAmount(HandleValueNumberToZero(value)), []);
  const sourceCurrencyCharCodeChanged = useCallback(value => setSourceCurrencyCharCode(value), []);
  const targetCurrencyCharCodeChanged = useCallback(value => setTargetCurrencyCharCode(value), []);

  return (
    <ConverterUI classes={ classes }
      amount={ amount }
      amountChanged={ amountChanged }
      sourceCurrencyValue={ sourceCurrencyValue }
      sourceCurrencyCharCode={ sourceCurrencyCharCode }
      sourceCurrencyCharCodeChanged={ sourceCurrencyCharCodeChanged }
      targetCurrencyValue={ targetCurrencyValue }
      targetCurrencyCharCode={ targetCurrencyCharCode }
      targetCurrencyCharCodeChanged={ targetCurrencyCharCodeChanged }
      targetAmount={ targetAmount }
      availableCurrencies={ availableCurrencies }
      targetRate={ targetRate }
      isLoading={ isLoading }
      availableExchangeRateSources={ availableExchangeRateSources }
      exchangeRatesSourceKey={ exchangeRatesSourceKey }
      exchangeRatesSourceKeyChanged={ exchangeRatesSourceKeyChanged }
      warningMessage={ warningMessage }
    />
  );
}

export default ConverterWithCalculator;
