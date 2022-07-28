import { Fragment, useEffect, useState } from 'react';
import { ConverterModel, Currency } from './converter-model';
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
import styles__demoDataMessage from './__values/converter__demo-data-message.module.css';

function Converter(props) {
  const [model, setModel] = useState(new ConverterModel());
  useEffect(
    () => {
      ConverterModel
        .LoadFromCBRAsync()
        .then(exchangeRates => {
          const model1 = ConverterModel.setAvailableCurrencies(new ConverterModel(), exchangeRates?.Items);
          const model2 = ConverterModel.setSourceCurrencyCharCode(model1, Currency.RUB().CharCode);
          setModel(ConverterModel.setTargetCurrencyCharCode(model2, Currency.USD().CharCode));
        })
        .catch(error => {
          setModel(ConverterModel.getDemoDataModel(error.message));
        });
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
        { model.demoDataMessage && <p className={ styles__demoDataMessage.s }>{ model.demoDataMessage }</p> }
      </div>
    </Fragment>
  );
}

export default Converter;
