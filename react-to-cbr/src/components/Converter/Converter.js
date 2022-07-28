import { Fragment, useEffect, useState } from 'react';
import { ConverterModel } from './converter-model';
import Button from '../button/button';
import Editor from '../editor/editor';
import LabeledEditor from '../labeled-editor/labeled-editor';
import CurrencyRateExpression from '../currency-rate-expression/currency-rate-expression';
import { convertCurrenciesToSelectElementOptions } from './utils';
import { ReactComponent as UpDownArrowsSvg } from '../../images/up-down-arrows.svg'; /* from https://uxwing.com/up-down-arrows-icon/ */

import styles from './converter.module.css';
import styles__currencyToggler from './__currency-toggler/converter__currency-toggler.module.css';
import styles__targetAmount from './__target-amount/converter__target-amount.module.css';
import styles__values from './__values/converter__values.module.css';

function Converter(props) {
  const [model, setModel] = useState(new ConverterModel());
  useEffect(
    () => {
      ConverterModel
        .LoadFromCBRAsync()
        .then(exchangeRates => {
          setModel(ConverterModel.setAvailableCurrencies(new ConverterModel(), exchangeRates?.Items));
        })
        .catch(reason => { /* TODO: update model */ });
    },
    [/* TODO: disable UI until loaded: add 'Loading...' indicator*/]
  );

  const selectCurrencyOptions = convertCurrenciesToSelectElementOptions(model.availableCurrencies).map(item => {
    return (<option key={ item.value } value={ item.value }>{ item.text }</option>);
  });

  const handleAmountChange = e => {
    setModel(ConverterModel.setAmount(model, Number(e.target.value)));
  };
  const handleSourceCurrencyChange = e => {
    setModel(ConverterModel.setSourceCurrencyCharCode(model, e.target.value));
  };
  const handleTargetCurrencyChange = e => {
    setModel(ConverterModel.setTargetCurrencyCharCode(model, e.target.value));
  };
  const handleTogglerClick = () => {
    const currentSourceCurrencyCharCode = model.sourceCurrencyCharCode;
    // setModel(ConverterModel.apply(model, [
    //   { method: ConverterModel.setSourceCurrencyCharCode, args: model.targetCurrencyCharCode },
    //   { method: ConverterModel.setTargetCurrencyCharCode, args: currentSourceCurrencyCharCode }
    // ]));
    var model1 = ConverterModel.setSourceCurrencyCharCode(model, model.targetCurrencyCharCode);
    setModel(ConverterModel.setTargetCurrencyCharCode(model1, currentSourceCurrencyCharCode));
  };

  return (
    <Fragment>
      <div className={ `${props.classes} ${styles.s}` }>
        <form onSubmit={ e => e.preventDefault() }>
          <fieldset className={ `${styles__values.s}` }>
            <Editor value={ model.amount } onInput={ handleAmountChange } type="number" required step="0.01" />
            <LabeledEditor caption="From">
              <Editor tagName="select" required value={ model.sourceCurrencyCharCode } onChange={ handleSourceCurrencyChange } >
                { selectCurrencyOptions }
              </Editor>
            </LabeledEditor>
            <Button classes={ `${styles__currencyToggler.s}` } onClick={ handleTogglerClick } svgImage={ UpDownArrowsSvg } text="Toggle currencies" />
            <LabeledEditor caption="Into">
              <Editor tagName="select" required value={ model.targetCurrencyCharCode } onChange={ handleTargetCurrencyChange } >
                { selectCurrencyOptions }
              </Editor>
            </LabeledEditor>
          </fieldset>
        </form>
        <p className={ `${styles__targetAmount.s}` }>{ model.targetAmount }</p>
        <CurrencyRateExpression
          sourceCurrencyCharCode={ model.sourceCurrencyCharCode }
          targetRate={ model.targetRate }
          targetCurrencyCharCode={ model.targetCurrencyCharCode } />
      </div>
    </Fragment>
  );
}

export default Converter;
