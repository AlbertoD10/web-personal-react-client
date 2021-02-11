import React, { useState, useEffect } from "react";
import MenuWebList from "../../../components/Admin/MenuWeb/MenuWebList";
import { getMenuApi } from "../../../api/menu";

import "./MenuWeb.scss";

export default function MenuWeb() {
  const [menuList, setMenuList] = useState([]);
  const [reloadMenu, setRealoadMenu] = useState(false);

  useEffect(() => {
    getMenuApi().then((response) => {
      setMenuList(response.menu);
    });
    setRealoadMenu(false);
  }, [reloadMenu]);

  return (
    <div className="menu">
      <MenuWebList menuList={menuList} setRealoadMenu={setRealoadMenu} />
    </div>
  );
}
