import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import { Layout, Menu, theme, message } from 'antd';
import {
  HomeOutlined,
  BookOutlined,
  LoginOutlined, PlusOutlined,
} from '@ant-design/icons';
import LoginPage from './pages/LoginPage';
import WorkspacesPage from './pages/WorkspacesPage';
import BookingsPage from './pages/BookingsPage';
import CreateWorkspacePage from "./pages/CreateWorkspacePage";

const { Header, Content, Footer, Sider } = Layout;

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [user, setUser] = useState(null);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  useEffect(() => {
    const savedUser = localStorage.getItem('bookingAppUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLoginSuccess = (userData) => {
    localStorage.setItem('bookingAppUser', JSON.stringify(userData));
    setUser(userData);
    message.success(`Welcome, ${userData.email}!`);
  };

  const handleLogout = () => {
    localStorage.removeItem('bookingAppUser');
    setUser(null);
    message.success('Logged out successfully');
  };

  return (
      <Router>
        {!user ? (
            <LoginPage onLoginSuccess={handleLoginSuccess} />
        ) : (
            <Layout style={{ minHeight: '100vh' }}>
              <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div className="demo-logo-vertical" />
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                  <Menu.Item key="1" icon={<HomeOutlined />}>
                    <Link to="/">All Bookings</Link>
                  </Menu.Item>
                  <Menu.Item key="2" icon={<BookOutlined />}>
                    <Link to="/my-bookings">My Bookings</Link>
                  </Menu.Item>
                  {user && user.role === 'admin' && (
                      <Menu.Item key="4" icon={<PlusOutlined />}>
                        <Link to="/create-workspace">Create Workspace</Link>
                      </Menu.Item>
                  )}
                  <Menu.Item
                      key="3"
                      icon={<LoginOutlined />}
                      onClick={handleLogout}
                  >
                    Logout
                  </Menu.Item>
                </Menu>
              </Sider>
              <Layout>
                <Header style={{ padding: 0, background: colorBgContainer }} />
                <Content style={{ margin: '0 16px' }}>
                  <div style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>
                    <Routes>
                      <Route path="/" element={<WorkspacesPage userId={user.id} />} />
                      <Route path="/my-bookings" element={<BookingsPage userId={user.id} />} />
                      <Route
                          path="/create-workspace"
                          element={user?.role === 'admin' ? <CreateWorkspacePage /> : <Navigate to="/" />}
                      />
                      <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                  </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                  Booking System ©2023
                </Footer>
              </Layout>
            </Layout>
        )}
      </Router>
  );
};

export default App;