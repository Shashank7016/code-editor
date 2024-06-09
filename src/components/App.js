import React, { useState, useEffect } from 'react';
import { Layout, Menu, Space } from 'antd';
import Editor from './Editor';
import useLocalStorage from '../hooks/useLocalStorage';
import '../App.css';

const { Header, Content, Footer } = Layout;

function App() {
  const [html, setHtml] = useLocalStorage('html', '');
  const [css, setCss] = useLocalStorage('css', '');
  const [js, setJs] = useLocalStorage('js', '');
  const [srcDoc, setSrcDoc] = useState('');

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
                language="xml"
                displayName="HTML"
                value={html}
                onChange={setHtml}
                onDownload={() => downloadFile('index.html', html)}
              />
              <Editor
                language="css"
                displayName="CSS"
                value={css}
                onChange={setCss}
                onDownload={() => downloadFile('styles.css', css)}
              />
              <Editor
                language="javascript"
                displayName="JS"
                value={js}
                onChange={setJs}
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
