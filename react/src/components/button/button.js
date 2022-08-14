import styles__image from './__image/button__image.module.css';
import styles__text from './__text/button__text.module.css';

function Button({ classes, onClick, svgImage, text, ...rest }) {
  const SvgImageTag = svgImage;
  return (
    <button className={ `${classes}` } type="button" onClick={ onClick } { ...rest }>
      {/* https://create-react-app.dev/docs/adding-images-fonts-and-files */ }
      <SvgImageTag className={ styles__image.s } />
      <p className={ styles__text.s }>{ text }</p>
    </button>
  );
}

export default Button;
