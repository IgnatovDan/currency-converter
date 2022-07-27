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
    <form className={ `${props.classes}` }>
      <fieldset className="converter__values">
        <Editor classes="converter__source-amount" />
        <LabeledEditor classes="converter__source-currency" />
        <Button classes="converter__currency-toggler" />
        <LabeledEditor classes="converter__target-currency" />
        {/* TODO: Add 'Into' caption */}
      </fieldset>
    </form>
  );
}

export default Converter;
