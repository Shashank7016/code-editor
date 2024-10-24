import React, { useState } from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { css } from '@codemirror/lang-css'
import { html } from '@codemirror/lang-html'
import { Card, Button } from 'antd'
import { ExpandAltOutlined, ShrinkOutlined, PullRequestOutlined } from '@ant-design/icons'

interface EditorProps {
  language: 'javascript' | 'css' | 'html'
  displayName: string
  value: string
  onChange: (value: string) => void
  onPullChanges: () => void
}

export default function Editor({ language, displayName, value, onChange, onPullChanges }: EditorProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  const getLanguage = () => {
    switch (language) {
      case 'javascript':
        return javascript()
      case 'css':
        return css()
      case 'html':
        return html()
      default:
        return javascript()
    }
  }

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed)
  }

  return (
    <Card
      title={
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>{displayName}</span>
          <div>
            <Button
              icon={<PullRequestOutlined />}
              onClick={onPullChanges}
              size="small"
              style={{ marginRight: '8px' }}
            />
            <Button
              icon={isCollapsed ? <ExpandAltOutlined /> : <ShrinkOutlined />}
              onClick={toggleCollapse}
              size="small"
            />
          </div>
        </div>
      }
      className={`editor-card ${isCollapsed ? 'collapsed' : ''}`}
      bodyStyle={{ padding: 0, display: isCollapsed ? 'none' : 'block' }}
    >
      <CodeMirror
        value={value}
        height="300px"
        extensions={[getLanguage()]}
        onChange={(value) => onChange(value)}
        theme="dark"
        basicSetup={{
          lineNumbers: true,
          highlightActiveLineGutter: true,
          foldGutter: true,
          dropCursor: true,
          allowMultipleSelections: true,
          indentOnInput: true,
          bracketMatching: true,
          closeBrackets: true,
          autocompletion: true,
          rectangularSelection: true,
          crosshairCursor: true,
          highlightActiveLine: true,
          highlightSelectionMatches: true,
          closeBracketsKeymap: true,
          defaultKeymap: true,
          searchKeymap: true,
          historyKeymap: true,
          foldKeymap: true,
          completionKeymap: true,
          lintKeymap: true,
        }}
      />
    </Card>
  )
}