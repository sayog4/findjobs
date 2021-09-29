import React from 'react'
import { Layout, Menu, Typography, Input, Drawer } from 'antd'
import {
  CheckOutlined,
  HomeOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PlusOutlined,
  PlusSquareOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { useSearchContext } from '../context/searchContext'
import { useAuth } from '../context/userContext'
import { useAuth as useAuthentication } from '../hooks/useAuth'

const { Header, Sider, Content } = Layout
const { Title, Text } = Typography
const { Search } = Input

interface Props {
  children: React.ReactNode
}

function Pagelayout({ children }: Props) {
  const [collapsed, setCollapsed] = React.useState(false)
  const { setSearchQuery } = useSearchContext()
  const { user } = useAuth()
  const { logOut } = useAuthentication()

  function toggle() {
    setCollapsed((prev) => !prev)
  }

  async function handleLogOut() {
    await logOut()
    window.location.reload()
  }

  return (
    <Layout>
      <Sider
        className="hideOnMobile"
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{ position: 'sticky', overflow: 'auto', top: 0 }}
      >
        <Link to="/">
          <Title className="logo">{collapsed ? 'FJ' : 'FindJobs'}</Title>
        </Link>
        <MenuList handleLogOut={handleLogOut} />
      </Sider>
      <Drawer
        title="Basic Drawer"
        placement="left"
        closable={false}
        onClose={toggle}
        visible={collapsed}
        key="dtawer"
        className="hideOnDesktop"
        bodyStyle={{ backgroundColor: '#001529', padding: '0' }}
      >
        <MenuList handleLogOut={handleLogOut} />
      </Drawer>
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
              {window.location.pathname === '/' && (
                <Search onSearch={(value) => setSearchQuery(value)} />
              )}
            </div>

            <div className="flex">
              <Link to="/profile" style={{ marginRight: 15 }}>
                <Title style={{ color: '#fff' }} level={5}>
                  {user?.userName}
                </Title>
              </Link>
            </div>
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
interface ListProps {
  handleLogOut: () => void
}
function MenuList({ handleLogOut }: ListProps) {
  return (
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
      <Menu.Item onClick={handleLogOut} icon={<LogoutOutlined />} key="/logout">
        <Text
          style={{
            color: 'rgba(255, 255, 255, 0.65)',
          }}
        >
          LogOut
        </Text>
      </Menu.Item>
    </Menu>
  )
}
export default Pagelayout
