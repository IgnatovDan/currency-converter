import './button.css';
import './__image/button__image.css';
import './__text/button__text.css';

function Button({ classes, onClick }) {
  // TODO: pass image and caption as markup
  return (
    <button className={ `${classes} button` } type="button" onClick={ onClick }>
      <div className="button__image"></div>
      <div className="button__text">Toggle currencies</div>
    </button>
  );
}

export default Button;
