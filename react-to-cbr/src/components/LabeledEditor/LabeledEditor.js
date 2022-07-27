import './labeled-editor.css';

export default function LabeledEditor(props) {
  // TODO: pass caption as child markup
  return (
    <label className={ `${props.classes} labeled-editor` }>
      Into
      <select className="editor" required />
    </label>
  );
}
