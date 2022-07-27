import './labeled-editor.css';

function LabeledEditor({ classes, caption, children }) {
  return (
    <label className={ `${classes} labeled-editor` }>
      { caption }
      { children }
    </label>
  );
}

export default LabeledEditor;
