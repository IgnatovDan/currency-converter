import './editor.css';

function Editor({ classes, tagName, ...rest }) {
  const EditorTag = tagName ?? 'input';
  return (
    <EditorTag className={ `${classes} editor` }  {...rest}>
    </EditorTag>
  );
}

export default Editor;
