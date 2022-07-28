import './button.css';
import './__image/button__image.css';
import './__text/button__text.css';

// https://create-react-app.dev/docs/adding-images-fonts-and-files
import { ReactComponent as UpDownArrows } from '../../images/up-down-arrows.svg'; /* from https://uxwing.com/up-down-arrows-icon/ */

function Button({ classes, onClick }) {
  // TODO: pass image and caption as markup
  return (
    <button className={ `${classes} button` } type="button" onClick={ onClick }>
      <UpDownArrows className="button__image"/>
      <div className="button__text">Toggle currencies</div>
    </button>
  );
}

export default Button;
