import React from "react";
import { Link, withRouter } from "react-router-dom";
import { Layout, Menu } from "antd";
import { HomeOutlined, MenuOutlined, UserOutlined } from "@ant-design/icons";

import "./MenuSider.scss";
const { Sider } = Layout;

function MenuSider(props) {
  const {
    menuCollapsed,
    location: { pathname },
  } = props;

  return (
    <Sider className="admin-sider" collapsed={menuCollapsed}>
      <Menu theme="dark" mode="inline" defaultSelectedKeys={[pathname]}>
        <Menu.Item key="/admin" icon={<HomeOutlined />}>
          <Link to="/admin">Home</Link>
        </Menu.Item>
        <Menu.Item key="/admin/users" icon={<UserOutlined />}>
          <Link to="/admin/users">Usuarios</Link>
        </Menu.Item>
        <Menu.Item key="/admin/menu-web" icon={<MenuOutlined />}>
          <Link to="/admin/menu-web">Menu Web</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
}

//Lo exporto asi para poder obtener la ruta de la web por los props
export default withRouter(MenuSider);
