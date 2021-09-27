import React from 'react'
import { Layout, Menu, Typography, Input } from 'antd'
import {
  CheckOutlined,
  HomeOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PlusOutlined,
  PlusSquareOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { useSearchContext } from '../context/searchContext'

const { Header, Sider, Content } = Layout
const { Title } = Typography
const { Search } = Input

interface Props {
  children: React.ReactNode
}

function Pagelayout({ children }: Props) {
  const [collapsed, setCollapsed] = React.useState(false)
  const { setSearchQuery } = useSearchContext()

  function toggle() {
    setCollapsed((prev) => !prev)
  }

  return (
    <Layout>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{ position: 'sticky', overflow: 'auto', top: 0 }}
      >
        <Title className="logo">{collapsed ? 'FJ' : 'FindJobs'}</Title>

        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[window.location.pathname]}
        >
          <Menu.Item key="/" icon={<HomeOutlined />}>
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="/profile" icon={<UserOutlined />}>
            <Link to="/profile">Profile</Link>
          </Menu.Item>
          <Menu.Item key="/appliedjobs" icon={<PlusSquareOutlined />}>
            <Link to="/appliedjobs">Applied Jobs</Link>
          </Menu.Item>
          <Menu.Item key="/postjob" icon={<PlusOutlined />}>
            <Link to="/postjob">Post Job</Link>
          </Menu.Item>
          <Menu.Item key="/postedjobs" icon={<CheckOutlined />}>
            <Link to="/postedjobs">Posted Job</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            position: 'sticky',
            overflow: 'auto',
            top: 0,
            padding: 0,
            zIndex: 9999,
          }}
        >
          <div className="flex">
            <div>
              {React.createElement(
                collapsed ? MenuFoldOutlined : MenuUnfoldOutlined,
                {
                  className: 'trigger',
                  onClick: toggle,
                }
              )}
            </div>

            <div className="flex">
              <Search onSearch={(value) => setSearchQuery(value)} />
            </div>

            <div>User info</div>
          </div>
        </Header>
        <Content
          className="site-layout-background"
          style={{
            padding: 24,
            minHeight: 280,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  )
}

export default Pagelayout
