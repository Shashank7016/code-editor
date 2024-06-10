import React, { useState, useEffect, useRef } from 'react';
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
  const { userId, editorId, language, displayName, value, onChange, onSendChange, onDownload } = props;
  const [open, setOpen] = useState(true);
  const [changes, setChanges] = useState('');
  const changesRef = useRef({});  // Store incoming changes
  const ws = useRef(null);

  function handleChange(editor, data, value) {
    console.log(`Editor change: ${language}`, value);
    onChange(value);
    onSendChange(value);
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

  useEffect(() => {
    ws.current = new WebSocket('ws://localhost:8080');

    ws.current.onmessage = (event) => {
      try {
        const { userId: incomingUserId, editorId: incomingEditorId, language: incomingLanguage, value: incomingValue } = JSON.parse(event.data);
        if (incomingUserId !== userId && incomingLanguage === language) {
          console.log(`Received changes for ${language} from user ${incomingUserId}:`, incomingValue);
          changesRef.current[incomingEditorId] = incomingValue; // Store incoming changes in ref
        }
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    };

    return () => {
      ws.current.close();
    };
  }, [userId, language]);

  const handleReviewChanges = () => {
    const editorIds = Object.keys(changesRef.current);
    const changesToReview = editorIds.map(editorId => ({
      editorId,
      value: changesRef.current[editorId],
    })).filter(change => change.value !== undefined);

    console.log(`Reviewing changes:`, changesToReview);
    alert(`Changes:\n${JSON.stringify(changesToReview, null, 2) || 'No changes available'}`);
  };

  const handlePullChanges = (editorId) => {
    editorId=Object.keys(changesRef.current);// change made
    const storedChanges = changesRef.current[editorId];
    console.log(`Pulling changes for editor ${editorId}: ${storedChanges}`);
    if (storedChanges) {
      onChange(storedChanges);
      setChanges(storedChanges);
    } else {
      alert('No changes to pull.');
    }
  };

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
          <button className="expcollbtn" onClick={handleReviewChanges}>
            Review Changes
          </button>
          <button className="expcollbtn" onClick={() => handlePullChanges(editorId)}>
            Pull Changes
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
