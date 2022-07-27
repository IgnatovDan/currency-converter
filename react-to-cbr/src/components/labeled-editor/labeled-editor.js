import './labeled-editor.css';

function LabeledEditor({ classes, caption, children}) {
  // TODO: pass caption as child markup
  return (
    <label className={ `${classes} labeled-editor` }>
      { caption }
      { children }
    </label>
  );
}

export default LabeledEditor;
