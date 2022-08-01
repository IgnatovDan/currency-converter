import { Fragment, useEffect, useState } from 'react';
import Button from '../button/button';
import Editor from '../editor/editor';
import LabeledEditor from '../labeled-editor/labeled-editor';
import CurrencyRateExpression from '../currency-rate-expression/currency-rate-expression';
import { convertCurrenciesToSelectElementOptions } from './utils';
import { ReactComponent as UpDownArrowsSvg } from '../../images/up-down-arrows.svg'; /* from https://uxwing.com/up-down-arrows-icon/ */
import LoadingPanel from '../loading-panel/loading-panel';
import rateSourcesManager from '../../api/exchange-sources/exchange-sources-manager.js';

import { Currency } from './converter-model-data-objects';

import styles from './converter.module.css';
import styles__currencyToggler from './__currency-toggler/converter__currency-toggler.module.css';
import styles__targetAmount from './__target-amount/converter__target-amount.module.css';
import styles__values from './__values/converter__values.module.css';
import styles__demoDataMessage from './__demo-data-message/converter__demo-data-message.module.css';

function Converter({
  classes,
  availableCurrencies,
  amount,
  amountChanged,
  sourceCurrencyCharCode,
  sourceCurrencyCharCodeChanged,
  targetCurrencyCharCode,
  targetCurrencyCharCodeChanged,
  targetAmount,
  targetRate,
  demoDataMessage,
  isLoading,
  exchangeRatesSourceKey,
  exchangeRatesSourceKeyChanged,
  availableExchangeRateSources }) {

  const selectCurrencyOptions = convertCurrenciesToSelectElementOptions(availableCurrencies).map(item => {
    return (<option key={ item.value } value={ item.value }>{ item.text }</option>);
  });

  const handleAmountChange = e => amountChanged(Number(e.target.value));
  const handleSourceCurrencyChange = e => sourceCurrencyCharCodeChanged(e.target.value);
  const handleTargetCurrencyChange = e => targetCurrencyCharCodeChanged(e.target.value);

  const handleTogglerClick = () => {
    const currentSourceCurrencyCharCode = sourceCurrencyCharCode;
    sourceCurrencyCharCodeChanged(targetCurrencyCharCode);
    targetCurrencyCharCodeChanged(currentSourceCurrencyCharCode);
  };

  const selectExchangeRatesSourceOptions = availableExchangeRateSources?.map(item => {
    return (<option key={ item.key } value={ item.key }>{ item.caption }</option>);
  });
  
  const handleExchangeRatesSourceChange = e => exchangeRatesSourceKeyChanged(e.target.value);

  return (
    <Fragment>
      <div className={ `${classes} ${styles.s}` }>
        <form onSubmit={ e => e.preventDefault() }>
          <fieldset className={ styles__values.s }>
            <Editor value={ amount } onInput={ handleAmountChange } type="number" required step="0.01" />
            <LabeledEditor caption="From">
              <Editor tagName="select" required value={ sourceCurrencyCharCode } onChange={ handleSourceCurrencyChange } >
                { selectCurrencyOptions }
              </Editor>
            </LabeledEditor>
            <Button classes={ styles__currencyToggler.s } onClick={ handleTogglerClick } svgImage={ UpDownArrowsSvg } text="Toggle currencies" />
            <LabeledEditor caption="Into">
              <Editor tagName="select" required value={ targetCurrencyCharCode } onChange={ handleTargetCurrencyChange } >
                { selectCurrencyOptions }
              </Editor>
            </LabeledEditor>
            <LabeledEditor caption="Exchange rates source">
              <Editor tagName="select" required value={ exchangeRatesSourceKey } onChange={ handleExchangeRatesSourceChange } >
                { selectExchangeRatesSourceOptions }
              </Editor>
            </LabeledEditor>
          </fieldset>
        </form>
        <p className={ styles__targetAmount.s }>{ targetAmount }</p>
        <CurrencyRateExpression
          sourceCurrencyCharCode={ sourceCurrencyCharCode }
          targetRate={ targetRate }
          targetCurrencyCharCode={ targetCurrencyCharCode } />
        { demoDataMessage && <p className={ styles__demoDataMessage.s }>{ demoDataMessage }</p> }
        { isLoading && <LoadingPanel /> }
      </div>
    </Fragment>
  );
}

function HandleValueNumberToZero(value) {
  if (Number.isNaN(value) || value === Infinity || value === undefined || value === null) {
    return 0;
  }
  return value;
}

function ConverterWrapper(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [availableCurrencies, setAvailableCurrencies] = useState([]);
  const [amount, setAmount] = useState(4000);
  const [targetAmount, setTargetAmount] = useState(0);
  const [targetRate, setTargetRate] = useState(0);
  const [sourceCurrencyValue, setSourceCurrencyValue] = useState(0);
  const [sourceCurrencyCharCode, setSourceCurrencyCharCode] = useState(Currency.USD().CharCode);
  const [targetCurrencyValue, setTargetCurrencyValue] = useState(0);
  const [targetCurrencyCharCode, setTargetCurrencyCharCode] = useState(Currency.RUB().CharCode);
  const [exchangeRatesSourceKey, setExchangeRatesSourceKey] = useState('cbr');
  const [demoDataMessage, setDemoDataMessage] = useState();

  useEffect(
    () => {
      const currentAbortController = {};
      rateSourcesManager.getRates(exchangeRatesSourceKey)
        .then(exchangeRates => {
          if (currentAbortController.aborted) {
            return;
          }
          setAvailableCurrencies(exchangeRates?.Items);
          setDemoDataMessage(exchangeRatesSourceKey === 'demo' ? 'Демо данные' : null);
          setIsLoading(false);
        })
        .catch(error => {
          if (currentAbortController.aborted) {
            return;
          }
          const demoDataMessageTemplate = "При получении данных о курсе обмена валют возникла ошибка и показаны демонстрационные данные";
          setIsLoading(false);
          setDemoDataMessage(`${demoDataMessageTemplate} (${error})`);
          setAvailableCurrencies([Currency.RUB(), Currency.USD(), Currency.GBP()]);
          setSourceCurrencyCharCode(Currency.USD().CharCode);
          setSourceCurrencyValue(Currency.USD().Value);
          setTargetCurrencyCharCode(Currency.RUB().CharCode);
          setTargetCurrencyValue(Currency.RUB().Value);
        });
      return () => currentAbortController.aborted = true; /* cancellationToken */
    },
    [exchangeRatesSourceKey]
  );

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

  const amountChanged = (value) => setAmount(HandleValueNumberToZero(value));

  const sourceCurrencyCharCodeChanged = (value) => {
    setSourceCurrencyCharCode(value);
  };

  const targetCurrencyCharCodeChanged = (value) => {
    setTargetCurrencyCharCode(value);
  };

  const exchangeRatesSourceKeyChanged = (value) => {
    setExchangeRatesSourceKey(value);
  }

  const availableExchangeRateSources = rateSourcesManager.getRegisteredSources().map(item => ({ key: item.key, caption: item.caption }))

  return (
    <Converter classes={ props.classes }
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
      demoDataMessage={ demoDataMessage }
    />
  );
}

export default ConverterWrapper;
