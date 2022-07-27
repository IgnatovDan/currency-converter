import { Fragment, useState } from 'react';
import { ConverterModel, CurrencyConverterContext } from '../../context/currency-converter-context';
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
    return (<option value={ item.CharCode }>{ item.Name }</option>);
  });
  
  return (
    <Fragment>
      <CurrencyConverterContext.Provider value={ { model, setModel } }>
        <form className={ `${props.classes}` }>
          <fieldset className="converter__values">
            <Editor classes="converter__source-amount" />
            <LabeledEditor classes="converter__source-currency" caption="From">
              <select className="editor" required >
                { selectCurrencyOptions }
              </select>
            </LabeledEditor>
            <Button classes="converter__currency-toggler" />
            <LabeledEditor classes="converter__target-currency" caption="Into">
              <select className="editor" required>
                { selectCurrencyOptions }
              </select>
            </LabeledEditor>
          </fieldset>
        </form>
        <p className="converter__target-amount">0</p>
        <CurrencyRateExpression
          sourceCurrencyCharCode={ model.sourceCurrencyCharCode }
          targetRate={ model.targetRate }
          targetCurrencyCharCode={ model.targetCurrencyCharCode } />
      </CurrencyConverterContext.Provider>
    </Fragment>
  );
}

export default Converter;
