import styles from './labeled-editor.module.css';

function LabeledEditor({ caption, children }) {
  return (
    <label className={ styles.s }>
      { caption }
      { children }
    </label>
  );
}

export default LabeledEditor;
