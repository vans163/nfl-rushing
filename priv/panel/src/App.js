import React, { useState } from 'react';
import { hot } from 'react-hot-loader/root'

import { GlobalStateProvider, useGlobalState, setGlobalState } from './state/state';
import { apiLoadTable } from './api/api';

import { RushTable } from './RushTable';

import { Layout, Menu, Icon, Select } from 'antd';
const { Header, Sider, Content } = Layout;
const { Option } = Select;

const App2 = ()=> {
  const [sideCollapsed, setSideCollapsed] = useState(false);
  const [nav] = useGlobalState('nav');

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={sideCollapsed}>
        <div className="logo" />
        <Menu theme="dark" mode="inline" selectedKeys={["/"]}>
          <Menu.Item key="/">
            <Icon type="user" />
            <span>Rushing</span>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: 0 }}>
          <Icon
            className="trigger"
            type={sideCollapsed ? 'menu-unfold' : 'menu-fold'}
            onClick={()=> setSideCollapsed(!sideCollapsed)}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 12,
            background: '#fff',
            minHeight: 280,
          }}
        >
          <RushTable/>
        </Content>
      </Layout>
    </Layout>
  );
}

const App = ()=> {
  return (
    <GlobalStateProvider>
      <App2/>
    </GlobalStateProvider>
  );
}

export default process.env.NODE_ENV === "development" ? hot(App) : App
