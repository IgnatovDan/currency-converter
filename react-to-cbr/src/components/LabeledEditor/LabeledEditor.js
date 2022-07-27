import './labeled-editor.css';

export default function LabeledEditor({ classes, caption }) {
  // TODO: pass caption as child markup
  return (
    <label className={ `${classes} labeled-editor` }>
      { caption }
      <select className="editor" required />
    </label>
  );
}
