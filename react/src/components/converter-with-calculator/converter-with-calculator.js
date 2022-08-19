import { useCallback, useEffect, useState, useMemo } from 'react';
import ConverterUI from '../converter-ui/converter-ui.js';

import { calculateTargetAmount, calculateTargetRate } from '../../api/currency-converter';
import { HandleValueNumberToZero } from '../../api/utils';

function handleIncorrectCharCode(charCode, availableCurrencies, defaultCharCode) {
  if (!charCode || !availableCurrencies?.find(item => item.CharCode === charCode)) {
    if (availableCurrencies?.find(item => item.CharCode === defaultCharCode)) {
      return defaultCharCode;
    }
    else if (availableCurrencies.length) {
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
    const newValue = calculateTargetAmount(amount, sourceCurrencyValue, targetCurrencyValue);
    setTargetAmount(newValue);
  }, [amount, sourceCurrencyValue, targetCurrencyValue]);

  useEffect(() => {
    const newValue = calculateTargetRate(sourceCurrencyValue, targetCurrencyValue);
    setTargetRate(newValue);
  }, [sourceCurrencyValue, targetCurrencyValue]);

  const amountChanged = useCallback(value => setAmount(HandleValueNumberToZero(value)), []);
  const sourceCurrencyCharCodeChanged = useCallback(value => setSourceCurrencyCharCode(value), []);
  const targetCurrencyCharCodeChanged = useCallback(value => setTargetCurrencyCharCode(value), []);

  const selectRatesSourceListItems = useMemo(
    () => availableExchangeRateSources?.map(item => ({ value: item.key, text: item.caption })),
    [availableExchangeRateSources]);
  
  const selectCurrencyListItems = useMemo(() => {
    return (availableCurrencies || []).map(item => ({ value: item.CharCode, text: item.Name + ` (${item.CharCode})` }))
  }, [availableCurrencies]);

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
      selectCurrencyListItems={ selectCurrencyListItems }
      targetRate={ targetRate }
      isLoading={ isLoading }
      selectRatesSourceListItems={ selectRatesSourceListItems }
      exchangeRatesSourceKey={ exchangeRatesSourceKey }
      exchangeRatesSourceKeyChanged={ exchangeRatesSourceKeyChanged }
      warningMessage={ warningMessage }
    />
  );
}

export default ConverterWithCalculator;
