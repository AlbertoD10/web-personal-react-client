import React, { useEffect, useState } from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import { getMenuApi } from "../../../api/menu";

import "./MenuTop.scss";

export default function MenuTop() {
  const [menuData, setMenuData] = useState([]);

  useEffect(() => {
    getMenuApi().then((response) => {
      let array = [];
      if (response.status === 200) {
        response.menu.forEach((element) => {
          if (element.active) {
            array.push(element);
          }
        });
        setMenuData(array);
      } else {
        setMenuData([]);
      }
    });
  }, []);

  return (
    <Menu className="menu-top-web" mode="horizontal">
      {menuData.map((item) => {
        return (
          <Menu.Item key={item._id} className="menu-top_item">
            <Link to={item.url}>{item.title}</Link>
          </Menu.Item>
        );
      })}

      <Menu.Item className="menu-top_item">
        <Link to={"/"}>Home</Link>
      </Menu.Item>
    </Menu>
  );
}
