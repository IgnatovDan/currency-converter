import { useCallback, useMemo } from 'react';
import Button from '../button/button';
import Editor from '../editor/editor';
import LabeledEditor from '../labeled-editor/labeled-editor';
import CurrencyRateExpression from '../currency-rate-expression/currency-rate-expression';
import { ReactComponent as UpDownArrowsSvg } from '../../images/up-down-arrows.svg'; /* from https://uxwing.com/up-down-arrows-icon/ */
import LoadingPanel from '../loading-panel/loading-panel';
import { Currency } from '../../api/exchange-sources/exchange-rates-data-objects';

import styles from './converter-ui.module.css';
import styles__currencyToggler from './__currency-toggler/converter-ui__currency-toggler.module.css';
import styles__targetAmount from './__target-amount/converter-ui__target-amount.module.css';
import styles__values from './__values/converter-ui__values.module.css';
import styles__warningMessage from './__warning-message/converter-ui__warning-message.module.css';

function ConverterUI({
  classes,
  selectCurrencyListItems,
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
  selectRatesSourceListItems }) {

  const handleAmountChange = useCallback(e => amountChanged(Number(e.target.value)), [amountChanged]);
  const handleSourceCurrencyChange = useCallback(e => sourceCurrencyCharCodeChanged(e.target.value), [sourceCurrencyCharCodeChanged]);
  const handleTargetCurrencyChange = useCallback(e => targetCurrencyCharCodeChanged(e.target.value), [targetCurrencyCharCodeChanged]);

  const handleTogglerClick = useCallback(() => {
    const currentSourceCurrencyCharCode = sourceCurrencyCharCode;
    sourceCurrencyCharCodeChanged?.(targetCurrencyCharCode);
    targetCurrencyCharCodeChanged?.(currentSourceCurrencyCharCode);
  }, [sourceCurrencyCharCode, sourceCurrencyCharCodeChanged, targetCurrencyCharCode, targetCurrencyCharCodeChanged]);

  const handleExchangeRatesSourceChange = e => exchangeRatesSourceKeyChanged(e.target.value);

  const sortedSelectCurrencyListItems = useMemo(() => {
    const RUB = Currency.RUB().CharCode;
    return (selectCurrencyListItems || [])
      .sort((a, b) => {
        if (a.value === RUB) {
          return -1;
        }
        else if (b.value === RUB) {
          return 1;
        }

        return ((a.text > b.text) ? 1 : -1);
      });
  }, [selectCurrencyListItems]);

  return (
    <div className={ `${classes} ${styles.s}` }>
      <form onSubmit={ e => e.preventDefault() }>
        <fieldset className={ styles__values.s }>
          <Editor
            aria-label="Source amount" // this text is not visible but it is obvious
            value={ amount } onInput={ handleAmountChange } type="number" required step="0.01" />
          <LabeledEditor caption="From">
            <Editor tagName="select" required value={ sourceCurrencyCharCode } onChange={ handleSourceCurrencyChange } listItems={ sortedSelectCurrencyListItems } />
          </LabeledEditor>
          <Button classes={ styles__currencyToggler.s } onClick={ handleTogglerClick } svgImage={ UpDownArrowsSvg } text="Toggle currencies" />
          <LabeledEditor caption="Into">
            <Editor tagName="select" required value={ targetCurrencyCharCode } onChange={ handleTargetCurrencyChange } listItems={ sortedSelectCurrencyListItems } />
          </LabeledEditor>
          <LabeledEditor caption="Exchange rates source">
            <Editor tagName="select" required value={ exchangeRatesSourceKey } onChange={ handleExchangeRatesSourceChange } listItems={ selectRatesSourceListItems } />
          </LabeledEditor>
        </fieldset>
      </form>
      <p
        aria-label="Target amount"
        className={ styles__targetAmount.s }>{ targetAmount }</p>
      <CurrencyRateExpression
        sourceCurrencyCharCode={ sourceCurrencyCharCode }
        targetRate={ targetRate }
        targetCurrencyCharCode={ targetCurrencyCharCode } />
      { warningMessage && <p aria-label="Warning message" className={ styles__warningMessage.s }>{ warningMessage }</p> }
      { isLoading && <LoadingPanel data-testid="loading-panel" /> }
    </div>
  );
}

export default ConverterUI;
