import React, { useEffect } from "react";
import { Layout, Menu, Button, theme } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HomeOutlined,
  CompassOutlined,
  MessageOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useSider } from "../context/SiderContext";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo_text_transparent.png";
import styles from "../styles/NavigationLayout.module.css"; // Import CSS module

const { Header, Sider, Content, Footer } = Layout;
interface NavigationLayoutProps {
  children: React.ReactNode;
  defaultSelectedKeys: string[];
}

const NavigationLayout: React.FC<NavigationLayoutProps> = ({
  children,
  defaultSelectedKeys,
}) => {
  const { collapsed, setCollapsed } = useSider();
  const navigate = useNavigate();
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  useEffect(() => {
    
    console.log("NavigationLayout: useEffect");
  })

  const menuItems = [
    {
      key: "1",
      icon: <HomeOutlined />,
      label: "Home",
      onClick: () => {
        navigate("/pages/home")
        navigate(0);
      },
    },
    {
      key: "2",
      icon: <CompassOutlined />,
      label: "Travels",
      onClick: () => {
        navigate("/pages/travels")
        navigate(0);
      },
    },
    {
      key: "3",
      icon: <MessageOutlined />,
      label: "Chat",
      onClick: () => {
        navigate("/pages/chat")
        navigate(0);
      },
    },
  ];

  return (
    <Layout className={styles.layoutNav}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={defaultSelectedKeys}
          items={menuItems}
        />
      </Sider>
      <Layout>
        <Header
          className={styles.headerNav}
          style={{ background: colorBgContainer }}
        >
          <Button
            className={styles.buttonNav}
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
          />
          <div className={styles.logoContainerNav}>
            <img
              className={styles.logoNav}
              src={logo}
              alt="Logo"
              onClick={() => {
                navigate("/pages/home");
                navigate(0);
                }
              }
            />
          </div>
          <Button
            className={styles.buttonNav}
            type="text"
            onClick={() => {
              navigate("/pages/account")
              navigate(0);
            }}
            icon={<UserOutlined />}
          />
        </Header>
        <Content
          className={styles.contentNav}
          style={{ background: colorBgContainer }}
        >
          {children}
        </Content>
        <Footer className={styles.footerNav}>
          <p>Copyright 2023 Produced by Ratpak.</p>
        </Footer>
      </Layout>
    </Layout>
  );
};

export default NavigationLayout;
