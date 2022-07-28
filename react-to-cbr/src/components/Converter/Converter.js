import { Fragment, useEffect, useState } from 'react';
import { ConverterModel } from './converter-model';
import Button from '../button/button';
import Editor from '../editor/editor';
import LabeledEditor from '../labeled-editor/labeled-editor';
import CurrencyRateExpression from '../currency-rate-expression/currency-rate-expression';
import { convertCurrenciesToSelectElementOptions } from './utils';
import { ReactComponent as UpDownArrowsSvg } from '../../images/up-down-arrows.svg'; /* from https://uxwing.com/up-down-arrows-icon/ */

import './converter.css';
import './__currency-toggler/converter__currency-toggler.css';
import './__target-amount/converter__target-amount.css';
import './__values/converter__values.css';

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
      <form className={ `${props.classes}` } onSubmit={ e => e.preventDefault() }>
        <fieldset className="converter__values">
          <Editor classes="converter__source-amount" value={ model.amount } onInput={ handleAmountChange } type="number" required step="0.01" />
          <LabeledEditor classes="converter__source-currency" caption="From">
            <Editor tagName="select" required value={ model.sourceCurrencyCharCode } onChange={ handleSourceCurrencyChange } >
              { selectCurrencyOptions }
            </Editor>
          </LabeledEditor>
          <Button classes="converter__currency-toggler" onClick={ handleTogglerClick } svgImage={ UpDownArrowsSvg } text="Toggle currencies"/>
          <LabeledEditor classes="converter__target-currency" caption="Into">
            <Editor tagName="select" required value={ model.targetCurrencyCharCode } onChange={ handleTargetCurrencyChange } >
              { selectCurrencyOptions }
            </Editor>
          </LabeledEditor>
        </fieldset>
      </form>
      <p className="converter__target-amount">{ model.targetAmount }</p>
      <CurrencyRateExpression
        sourceCurrencyCharCode={ model.sourceCurrencyCharCode }
        targetRate={ model.targetRate }
        targetCurrencyCharCode={ model.targetCurrencyCharCode } />
    </Fragment>
  );
}

export default Converter;
