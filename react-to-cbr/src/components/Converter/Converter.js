import { Fragment } from 'react';
import Button from '../button/button';
import Editor from '../editor/editor';
import LabeledEditor from '../labeled-editor/labeled-editor';
import RateExpression from '../rate-expression/rate-expression';

import './converter.css';
import './__currency-toggler/converter__currency-toggler.css';
import './__target-amount/converter__target-amount.css';
import './__values/converter__values.css';

function Converter(props) {
  return (
    <Fragment>
      <form className={ `${props.classes}` }>
        <fieldset className="converter__values">
          <Editor classes="converter__source-amount" />
          <LabeledEditor classes="converter__source-currency" caption="From" />
          <Button classes="converter__currency-toggler" />
          <LabeledEditor classes="converter__target-currency" caption="Into" />
        </fieldset>
      </form>
      <p className="converter__target-amount">0</p>
      <RateExpression />
    </Fragment>
  );
}

export default Converter;
