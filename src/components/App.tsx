import React, { useState } from 'react'
import { Layout, Menu } from 'antd'
import { CodeOutlined } from '@ant-design/icons'
import EditorManager from './EditorManager'

const { Header, Content, Footer, Sider } = Layout

export default function App() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="1" icon={<CodeOutlined />}>
            Editor
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          <h1 style={{ color: 'white', margin: 0, padding: '0 16px' }}>Code Editor</h1>
        </Header>
        <Content style={{ margin: '0 16px' }}>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            <EditorManager />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Code Editor ©2023 Created by Your Name
        </Footer>
      </Layout>
    </Layout>
  )
}