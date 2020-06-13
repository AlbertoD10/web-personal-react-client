import React from "react";
import { Button } from "antd";
import KevinLogo from "../../../assets/img/iconoLobo.png";
import {
  ArrowRightOutlined,
  ArrowLeftOutlined,
  PoweroffOutlined,
} from "@ant-design/icons";

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
        <Button
          type="link"
          onClick={() => {
            console.log("cerrar sesion");
          }}
        >
          <PoweroffOutlined />
        </Button>
      </div>
    </div>
  );
}
