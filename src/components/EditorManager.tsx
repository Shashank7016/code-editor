import React, { useState, useEffect } from 'react'
import { Button, Tabs, message, Tooltip } from 'antd'
import { PlusOutlined, DownloadOutlined, CopyOutlined } from '@ant-design/icons'
import Editor from './Editor'
import useLocalStorage from '../hooks//useLocalStorage'

const { TabPane } = Tabs

interface EditorData {
  id: string
  html: string
  css: string
  js: string
}

export default function EditorManager() {
  const [editors, setEditors] = useLocalStorage<EditorData[]>('editors', [
    { id: '1', html: '', css: '', js: '' }
  ])
  const [activeKey, setActiveKey] = useLocalStorage<string>('activeKey', '1')
  const [previewSrcDoc, setPreviewSrcDoc] = useState('')

  const addEditor = () => {
    const newId = String(editors.length + 1)
    setEditors([...editors, { id: newId, html: '', css: '', js: '' }])
    setActiveKey(newId)
  }

  const removeEditor = (targetKey: string) => {
    let newActiveKey = activeKey
    let lastIndex = -1
    editors.forEach((editor, i) => {
      if (editor.id === targetKey) {
        lastIndex = i - 1
      }
    })
    const newEditors = editors.filter(editor => editor.id !== targetKey)
    if (newEditors.length && newActiveKey === targetKey) {
      if (lastIndex >= 0) {
        newActiveKey = newEditors[lastIndex].id
      } else {
        newActiveKey = newEditors[0].id
      }
    }
    setEditors(newEditors)
    setActiveKey(newActiveKey)
  }

  const updateEditor = (id: string, language: 'html' | 'css' | 'js', value: string) => {
    setEditors(editors.map(editor => 
      editor.id === id ? { ...editor, [language]: value } : editor
    ))
  }

  const pullChanges = (fromId: string, toId: string, language: 'html' | 'css' | 'js') => {
    const fromEditor = editors.find(editor => editor.id === fromId)
    if (fromEditor) {
      updateEditor(toId, language, fromEditor[language])
    }
  }

  useEffect(() => {
    const currentEditor = editors.find(editor => editor.id === activeKey)
    if (currentEditor) {
      const timeout = setTimeout(() => {
        setPreviewSrcDoc(`
          <html>
            <body>${currentEditor.html}</body>
            <style>${currentEditor.css}</style>
            <script>${currentEditor.js}</script>
          </html>
        `)
      }, 250)
      return () => clearTimeout(timeout)
    }
  }, [editors, activeKey])

  const downloadFile = (filename: string, content: string) => {
    const element = document.createElement('a')
    const file = new Blob([content], { type: 'text/plain' })
    element.href = URL.createObjectURL(file)
    element.download = filename
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  const copyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content).then(() => {
      message.success('Copied to clipboard')
    }, () => {
      message.error('Failed to copy')
    })
  }

  return (
    <div>
      <Tabs
        activeKey={activeKey}
        onChange={setActiveKey}
        type="editable-card"
        onEdit={(targetKey, action) => {
          if (action === 'add') {
            addEditor()
          } else if (action === 'remove') {
            removeEditor(targetKey as string)
          }
        }}
      >
        {editors.map(editor => (
          <TabPane tab={`Editor ${editor.id}`} key={editor.id} closable={editors.length > 1}>
            <div className="editor-container">
              <Editor
                language="html"
                displayName="HTML"
                value={editor.html}
                onChange={(value) => updateEditor(editor.id, 'html', value)}
                onPullChanges={() => {
                  const otherEditors = editors.filter(e => e.id !== editor.id)
                  if (otherEditors.length > 0) {
                    pullChanges(otherEditors[0].id, editor.id, 'html')
                  }
                }}
              />
              <Editor
                language="css"
                displayName="CSS"
                value={editor.css}
                onChange={(value) => updateEditor(editor.id, 'css', value)}
                onPullChanges={() => {
                  const otherEditors = editors.filter(e => e.id !== editor.id)
                  if (otherEditors.length > 0) {
                    pullChanges(otherEditors[0].id, editor.id, 'css')
                  }
                }}
              />
              <Editor
                language="javascript"
                displayName="JS"
                value={editor.js}
                onChange={(value) => updateEditor(editor.id, 'js', value)}
                onPullChanges={() => {
                  const otherEditors = editors.filter(e => e.id !== editor.id)
                  if (otherEditors.length > 0) {
                    pullChanges(otherEditors[0].id, editor.id, 'js')
                  }
                }}
              />
            </div>
            <div className="editor-actions">
              <Tooltip title="Download HTML">
                <Button icon={<DownloadOutlined />} onClick={() => downloadFile(`editor${editor.id}_index.html`, editor.html)} />
              </Tooltip>
              <Tooltip title="Download CSS">
                <Button icon={<DownloadOutlined />} onClick={() => downloadFile(`editor${editor.id}_styles.css`, editor.css)} />
              </Tooltip>
              <Tooltip title="Download JS">
                <Button icon={<DownloadOutlined />} onClick={() => downloadFile(`editor${editor.id}_script.js`, editor.js)} />
              </Tooltip>
              <Tooltip title="Copy HTML">
                <Button icon={<CopyOutlined />} onClick={() => copyToClipboard(editor.html)} />
              </Tooltip>
              <Tooltip title="Copy CSS">
                <Button icon={<CopyOutlined />} onClick={() => copyToClipboard(editor.css)} />
              </Tooltip>
              <Tooltip title="Copy JS">
                <Button icon={<CopyOutlined />} onClick={() => copyToClipboard(editor.js)} />
              </Tooltip>
            </div>
          </TabPane>
        ))}
      </Tabs>
      <div className="preview-container">
        <h3>Preview for Editor {activeKey}</h3>
        <iframe
          srcDoc={previewSrcDoc}
          title="output"
          sandbox="allow-scripts"
          frameBorder="0"
          width="100%"
          height="100%"
        />
      </div>
    </div>
  )
}