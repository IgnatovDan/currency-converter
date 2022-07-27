import './button.css';

export default function Button(props) {
  // TODO: pass image and caption as markup
  return (
    <button className={ `${props.classes} button` } type="button">
      <div className="button__image"></div>
      <div className="button__text">Toggle currencies</div>
    </button>
  );
}
