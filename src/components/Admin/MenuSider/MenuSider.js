import React from "react";
import { Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import { HomeOutlined, MenuOutlined } from "@ant-design/icons";

import "./MenuSider.scss";
const { Sider } = Layout;

export default function MenuSider(props) {
  const { menuCollapsed } = props;

  return (
    <Sider className="admin-sider" collapsed={menuCollapsed}>
      <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
        <Menu.Item key="1" icon={<HomeOutlined />}>
          <Link to="/admin">Home</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<MenuOutlined />}>
          <Link to="/admin/menu-web">Menu Web</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
}
