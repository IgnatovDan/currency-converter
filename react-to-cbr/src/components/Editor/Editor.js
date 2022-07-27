import './editor.css';

function Editor(props) {
  return (
    <select className="editor" required={ props.required }>
    </select>
  );
}

export default Editor;
