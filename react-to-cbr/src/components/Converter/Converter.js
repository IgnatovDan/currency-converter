import { Fragment, useState } from 'react';
import { ConverterModel } from './converter-model';
import Button from '../button/button';
import Editor from '../editor/editor';
import LabeledEditor from '../labeled-editor/labeled-editor';
import CurrencyRateExpression from '../currency-rate-expression/currency-rate-expression';

import './converter.css';
import './__currency-toggler/converter__currency-toggler.css';
import './__target-amount/converter__target-amount.css';
import './__values/converter__values.css';

function Converter(props) {
  const [model, setModel] = useState(new ConverterModel());

  const selectCurrencyOptions = model.availableCurrencies.map(item => {
    return (<option key={ item.CharCode } value={ item.CharCode }>{ item.Name }</option>);
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
    var intermediateModel = ConverterModel.setSourceCurrencyCharCode(model, model.targetCurrencyCharCode);
    setModel(ConverterModel.setTargetCurrencyCharCode(intermediateModel, currentSourceCurrencyCharCode));
  };

  return (
    <Fragment>
      <form className={ `${props.classes}` } onSubmit={ e => e.preventDefault() }>
        <fieldset className="converter__values">
          <Editor classes="converter__source-amount" value={ model.amount } onInput={ handleAmountChange } type="number" required step="0.01"/>
          <LabeledEditor classes="converter__source-currency" caption="From">
            <Editor tagName="select" required value={ model.sourceCurrencyCharCode } onChange={ handleSourceCurrencyChange } >
              { selectCurrencyOptions }
            </Editor>
          </LabeledEditor>
          <Button classes="converter__currency-toggler" onClick={ handleTogglerClick } />
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
