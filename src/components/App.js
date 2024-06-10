import React, { useState, useEffect, useRef } from 'react';
import { Layout, Menu, Space } from 'antd';
import Editor from './Editor';
import useLocalStorage from '../hooks/useLocalStorage';
import { v4 as uuidv4 } from 'uuid';
import '../App.css';

const { Header, Content, Footer } = Layout;

function App() {
  const storedUserId = localStorage.getItem('userId');
  const userId = useRef(storedUserId ? storedUserId : (() => {
    const newUserId = uuidv4();
    localStorage.setItem('userId', newUserId);
    return newUserId;
  })());

  const storedHtmlEditorId = localStorage.getItem('htmlEditorId');
  const htmlEditorId = useRef(storedHtmlEditorId ? storedHtmlEditorId : (() => {
    const newHtmlEditorId = uuidv4();
    localStorage.setItem('htmlEditorId', newHtmlEditorId);
    return newHtmlEditorId;
  })());

  const storedCssEditorId = localStorage.getItem('cssEditorId');
  const cssEditorId = useRef(storedCssEditorId ? storedCssEditorId : (() => {
    const newCssEditorId = uuidv4();
    localStorage.setItem('cssEditorId', newCssEditorId);
    return newCssEditorId;
  })());

  const storedJsEditorId = localStorage.getItem('jsEditorId');
  const jsEditorId = useRef(storedJsEditorId ? storedJsEditorId : (() => {
    const newJsEditorId = uuidv4();
    localStorage.setItem('jsEditorId', newJsEditorId);
    return newJsEditorId;
  })());

  const [html, setHtml] = useLocalStorage(`codeeditor-html-${userId.current}`, '');
  const [css, setCss] = useLocalStorage(`codeeditor-css-${userId.current}`, '');
  const [js, setJs] = useLocalStorage(`codeeditor-js-${userId.current}`, '');
  const [srcDoc, setSrcDoc] = useState('');
  const ws = useRef(null);

  useEffect(() => {
    ws.current = new WebSocket('ws://localhost:8080');

    ws.current.onmessage = (event) => {
      try {
        const { userId: incomingUserId, editorId, language, value } = JSON.parse(event.data);
        console.log(`Received message: ${incomingUserId}, ${editorId}, ${language}, ${value}`);
        if (incomingUserId !== userId.current) {
          localStorage.setItem(`changes-${incomingUserId}-${editorId}`, value);
        }
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    };

    return () => {
      ws.current.close();
    };
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
        <html>
          <body>${html}</body>
          <style>${css}</style>
          <script>${js}</script>
        </html>
      `);
    }, 250);
    return () => clearTimeout(timeout);
  }, [html, css, js]);

  const downloadFile = (filename, content) => {
    const element = document.createElement('a');
    const file = new Blob([content], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleChange = (editorId, language, value) => {
    console.log(`Saving changes to local storage: ${editorId}, ${language}, ${value}`);
    if (editorId === htmlEditorId.current) setHtml(value);
    if (editorId === cssEditorId.current) setCss(value);
    if (editorId === jsEditorId.current) setJs(value);
  };

  const sendChanges = (editorId, language, value) => {
    console.log(`Sending changes: ${userId.current}, ${editorId}, ${language}, ${value}`);
    ws.current.send(JSON.stringify({ userId: userId.current, editorId, language, value }));
  };

  return (
    <Layout className="layout">
      <Header>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">Code Editor</Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <div className="site-layout-content">
          <Space direction="vertical" style={{ width: '100%' }}>
            <div className="panel panel-top">
              <Editor
                userId={userId.current}
                editorId={htmlEditorId.current}
                language="xml"
                displayName="HTML"
                value={html}
                onChange={(value) => handleChange(htmlEditorId.current, 'xml', value)}
                onSendChange={(value) => sendChanges(htmlEditorId.current, 'xml', value)}
                onDownload={() => downloadFile('index.html', html)}
              />
              <Editor
                userId={userId.current}
                editorId={cssEditorId.current}
                language="css"
                displayName="CSS"
                value={css}
                onChange={(value) => handleChange(cssEditorId.current, 'css', value)}
                onSendChange={(value) => sendChanges(cssEditorId.current, 'css', value)}
                onDownload={() => downloadFile('styles.css', css)}
              />
              <Editor
                userId={userId.current}
                editorId={jsEditorId.current}
                language="javascript"
                displayName="JS"
                value={js}
                onChange={(value) => handleChange(jsEditorId.current, 'javascript', value)}
                onSendChange={(value) => sendChanges(jsEditorId.current, 'javascript', value)}
                onDownload={() => downloadFile('script.js', js)}
              />
            </div>
            <div className="panel-bottom">
              <h1>Output:</h1>
              <iframe
                srcDoc={srcDoc}
                title="output"
                sandbox="allow-scripts"
                frameBorder="0"
                width="100%"
                height="100%"
              ></iframe>
            </div>
          </Space>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Code Editor ©2024 Created by YourName
      </Footer>
    </Layout>
  );
}

export default App;
