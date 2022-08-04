import styles from './editor.module.css';

function Editor({ tagName, listItems, ...rest }) {
  const EditorTag = tagName ?? 'input';
  const optionsMarkup = listItems?.map(item => {
    return (<option key={ item.value } value={ item.value }>{ item.text }</option>);
  });

  return (
    <EditorTag className={ styles.s }  { ...rest }>
      { optionsMarkup }
    </EditorTag>
  );
}

export default Editor;
