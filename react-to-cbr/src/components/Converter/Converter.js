import { Fragment } from 'react';
import Button from '../Button/Button';
import Editor from '../Editor/Editor';
import LabeledEditor from '../LabeledEditor/LabeledEditor';

import './converter.css';
import './__values/converter__values.css';
import './__values/converter__values.css';
import './__values/converter__values.css';
import './__values/converter__values.css';

function Converter(props) {
  return (
    <Fragment>
      <form className={ `${props.classes}` }>
        <fieldset className="converter__values">
          <Editor classes="converter__source-amount" />
          <LabeledEditor classes="converter__source-currency" />
          <Button classes="converter__currency-toggler" />
          <LabeledEditor classes="converter__target-currency" />
          {/* TODO: Add 'Into' caption */ }
        </fieldset>
      </form>
      <p class="conveter__target-amount">0</p>
      <div class="equal-expression">
        <p class="equal-expression__item">1</p>
        <p class="converter__source-rate-char-code equal-expression__item">USD</p>
        <p class="equal-expression__item">=</p>
        <p class="converter__target-rate-value equal-expression__item">1</p>
        <p class="converter__target-rate-char-code equal-expression__item">USD</p>
      </div>
    </Fragment>
  );
}

export default Converter;
