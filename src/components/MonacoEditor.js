import React, { useRef } from 'react';
import MonacoEditor from 'react-monaco-editor';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCompressAlt, faExpandAlt, faDownload } from '@fortawesome/free-solid-svg-icons';
import './MonacoEditor.css';

const MonacoEditorWrapper = (props) => {
  const { language, displayName, value, onChange, onDownload } = props;
  const [open, setOpen] = React.useState(true);
  const editorRef = useRef(null);

  const handleEditorDidMount = (editor) => {
    editorRef.current = editor;
  };

  return (
    <div className={`code-container ${open ? '' : 'collapsed'}`}>
      <div className="code-title">
        {displayName}
        <div>
          <button className="expcollbtn" onClick={() => setOpen((prevOpen) => !prevOpen)}>
            <FontAwesomeIcon icon={open ? faCompressAlt : faExpandAlt} />
          </button>
          <button className="expcollbtn" onClick={onDownload}>
            <FontAwesomeIcon icon={faDownload} />
          </button>
        </div>
      </div>
      {open && (
        <MonacoEditor
          language={language}
          value={value}
          options={{
            selectOnLineNumbers: true,
            automaticLayout: true,
          }}
          onChange={(newValue) => onChange(newValue)}
          editorDidMount={handleEditorDidMount}
        />
      )}
    </div>
  );
};

export default MonacoEditorWrapper;
