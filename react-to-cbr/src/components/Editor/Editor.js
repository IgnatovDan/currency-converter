import styles from './editor.module.css';

function Editor({ tagName, ...rest }) {
  const EditorTag = tagName ?? 'input';
  return (
    <EditorTag className={ styles.s }  {...rest}>
    </EditorTag>
  );
}

export default Editor;
