import { useCallback } from 'react';
import Button from '../button/button';
import Editor from '../editor/editor';
import LabeledEditor from '../labeled-editor/labeled-editor';
import CurrencyRateExpression from '../currency-rate-expression/currency-rate-expression';
import { convertCurrenciesToSelectListItems } from './utils';
import { ReactComponent as UpDownArrowsSvg } from '../../images/up-down-arrows.svg'; /* from https://uxwing.com/up-down-arrows-icon/ */
import LoadingPanel from '../loading-panel/loading-panel';

import styles from './converter-ui.module.css';
import styles__currencyToggler from './__currency-toggler/converter-ui__currency-toggler.module.css';
import styles__targetAmount from './__target-amount/converter-ui__target-amount.module.css';
import styles__values from './__values/converter-ui__values.module.css';
import styles__warningMessage from './__warning-message/converter-ui__warning-message.module.css';

function ConverterUI({
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
  warningMessage,
  isLoading,
  exchangeRatesSourceKey,
  exchangeRatesSourceKeyChanged,
  availableExchangeRateSources }) {

  const selectCurrencyListItems = convertCurrenciesToSelectListItems(availableCurrencies);

  const handleAmountChange = useCallback(e => amountChanged(Number(e.target.value)), [amountChanged]);
  const handleSourceCurrencyChange = useCallback(e => sourceCurrencyCharCodeChanged(e.target.value), [sourceCurrencyCharCodeChanged]);
  const handleTargetCurrencyChange = useCallback(e => targetCurrencyCharCodeChanged(e.target.value), [targetCurrencyCharCodeChanged]);

  const handleTogglerClick = useCallback(() => {
    const currentSourceCurrencyCharCode = sourceCurrencyCharCode;
    sourceCurrencyCharCodeChanged(targetCurrencyCharCode);
    targetCurrencyCharCodeChanged(currentSourceCurrencyCharCode);
  }, [sourceCurrencyCharCode, sourceCurrencyCharCodeChanged, targetCurrencyCharCode, targetCurrencyCharCodeChanged]);

  const selectRatesSourceCurrencyListItems = availableExchangeRateSources?.map(item => ({ value: item.key, text: item.caption }));

  const handleExchangeRatesSourceChange = e => exchangeRatesSourceKeyChanged(e.target.value);

  return (
    <div className={ `${classes} ${styles.s}` }>
      <form onSubmit={ e => e.preventDefault() }>
        <fieldset className={ styles__values.s }>
          <Editor value={ amount } onInput={ handleAmountChange } type="number" required step="0.01" />
          <LabeledEditor caption="From">
            <Editor tagName="select" required value={ sourceCurrencyCharCode } onChange={ handleSourceCurrencyChange } listItems={ selectCurrencyListItems } />
          </LabeledEditor>
          <Button classes={ styles__currencyToggler.s } onClick={ handleTogglerClick } svgImage={ UpDownArrowsSvg } text="Toggle currencies" />
          <LabeledEditor caption="Into">
            <Editor tagName="select" required value={ targetCurrencyCharCode } onChange={ handleTargetCurrencyChange } listItems={ selectCurrencyListItems } />
          </LabeledEditor>
          <LabeledEditor caption="Exchange rates source">
            <Editor tagName="select" required value={ exchangeRatesSourceKey } onChange={ handleExchangeRatesSourceChange } listItems={ selectRatesSourceCurrencyListItems } />
          </LabeledEditor>
        </fieldset>
      </form>
      <p className={ styles__targetAmount.s }>{ targetAmount }</p>
      <CurrencyRateExpression
        sourceCurrencyCharCode={ sourceCurrencyCharCode }
        targetRate={ targetRate }
        targetCurrencyCharCode={ targetCurrencyCharCode } />
      { warningMessage && <p className={ styles__warningMessage.s }>{ warningMessage }</p> }
      { isLoading && <LoadingPanel /> }
    </div>
  );
}

export default ConverterUI;
