import './button.css';
import './__image/button__image.css';
import './__text/button__text.css';

function Button({ classes, onClick, svgImage, text }) {
  const SvgImageTag = svgImage;
  return (
    <button className={ `${classes} button` } type="button" onClick={ onClick }>
      {/* https://create-react-app.dev/docs/adding-images-fonts-and-files */ }
      <SvgImageTag className="button__image" />
      <p className="button__text">text</p>
    </button>
  );
}

export default Button;
