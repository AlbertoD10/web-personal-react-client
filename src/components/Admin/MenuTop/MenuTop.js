import React from "react";
import { Button, Modal } from "antd";
import KevinLogo from "../../../assets/img/iconoLobo.png";
import {
  ArrowRightOutlined,
  ArrowLeftOutlined,
  PoweroffOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../../utils/constants";

import "./MenuTop.scss";

export default function MenuTop(props) {
  const { setMenuCollapsed, menuCollapsed } = props;

  return (
    <div className="menu-top">
      <div className="menu-top__left">
        {/* Boton para colapsar el sider */}
        <Button
          type="link"
          onClick={() => {
            setMenuCollapsed(!menuCollapsed);
          }}
        >
          {menuCollapsed ? <ArrowRightOutlined /> : <ArrowLeftOutlined />}
        </Button>
        <img
          className="menu-top__left-logo"
          src={KevinLogo}
          alt="Alberto web"
        />
      </div>
      <div className="menu-top__right">
        {/* Boton para cerra sesion */}
        <Button type="link" onClick={logoutUser}>
          <PoweroffOutlined />
        </Button>
      </div>
    </div>
  );
}

function logoutUser() {
  Modal.confirm({
    title: "¿Desea cerrar sesión?",
    icon: <ExclamationCircleOutlined />,
    content: "Haga click en OK para cerrar su sesión",
    okType: "danger",
    centered: true,
    onOk() {
      localStorage.removeItem(ACCESS_TOKEN);
      localStorage.removeItem(REFRESH_TOKEN);
      window.location.reload();
    },
  });
}
