import React, { useState } from 'react';
import 'codemirror/lib/codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/css/css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/hint/show-hint.css';
import 'codemirror/addon/hint/show-hint';
import 'codemirror/addon/hint/xml-hint';
import 'codemirror/addon/hint/html-hint';
import 'codemirror/addon/hint/css-hint';
import 'codemirror/addon/hint/javascript-hint';
import 'codemirror/addon/fold/foldgutter.css';
import 'codemirror/addon/fold/foldgutter';
import 'codemirror/addon/fold/brace-fold';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/selection/active-line';
import { Controlled as ControlledEditor } from 'react-codemirror2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCompressAlt, faExpandAlt, faDownload } from '@fortawesome/free-solid-svg-icons';

export default function Editor(props) {
  const { language, displayName, value, onChange, onDownload } = props;
  const [open, setOpen] = useState(true);

  function handleChange(editor, data, value) {
    onChange(value);
  }

  function handleEditorDidMount(editor) {
    editor.setOption('extraKeys', {
      'Ctrl-Space': 'autocomplete',
    });
    editor.on('inputRead', function onInputRead(cm, event) {
      if (!cm.state.completionActive && event.text[0].match(/[.\w@({]/)) {
        cm.showHint({ completeSingle: false });
      }
    });
  }

  return (
    <div className={`code-container ${open ? '' : 'collapsed'}`}>
      <div className="code-title">
        {displayName}
        <div>
          <button className="expcollbtn" onClick={() => setOpen(prevOpen => !prevOpen)}>
            <FontAwesomeIcon icon={open ? faCompressAlt : faExpandAlt} />
          </button>
          <button className="expcollbtn" onClick={onDownload}>
            <FontAwesomeIcon icon={faDownload} />
          </button>
        </div>
      </div>
      <ControlledEditor
        editorDidMount={handleEditorDidMount}
        onBeforeChange={handleChange}
        value={value}
        className="code-mirror-wrapper"
        options={{
          lineWrapping: true,
          lint: true,
          mode: language,
          theme: 'material',
          lineNumbers: true,
          extraKeys: { 'Ctrl-Space': 'autocomplete' },
          foldGutter: true,
          gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
          autoCloseTags: true,
          autoCloseBrackets: true,
          styleActiveLine: false,
        }}
      />
    </div>
  );
}
