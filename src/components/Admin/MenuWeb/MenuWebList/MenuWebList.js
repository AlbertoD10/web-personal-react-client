import React, { useEffect, useState } from "react";
import { Button, Switch, List, notification } from "antd";
import DragSortableList from "react-drag-sortable";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { updateMenuApi, deleteMenuApi } from "../../../../api/menu";
import { getAccessTokenApi } from "../../../../api/auth";
import AddMenuModal from "./AddMenuModal";
import EditMenuModal from "./EditMenuModal";

import "./MenuWebList.scss";

export default function MenuWebList(props) {
  const { menuList, setRealoadMenu } = props;
  const [listItems, setListItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editModalContent, setEditModalContent] = useState({});

  useEffect(() => {
    const listArrayItems = [];
    menuList.forEach((item) => {
      listArrayItems.push({
        content: (
          <ListItems
            item={item}
            setRealoadMenu={setRealoadMenu}
            setShowEditModal={setShowEditModal}
            setEditModalContent={setEditModalContent}
          />
        ),
      });
    });
    setListItems(listArrayItems);
  }, [menuList]);

  const onSort = (sortedList, dropEvent) => {
    // console.log("sortedList", sortedList, dropEvent);
    const token = getAccessTokenApi();

    sortedList.forEach((item) => {
      const order = item.rank;
      const { _id } = item.content.props.item;
      updateMenuApi(token, _id, { order });
    });
  };
  return (
    <div className="menu-web-list">
      <div className="menu-web-list_header">
        <Button type="primary" onClick={() => setShowModal(true)}>
          Crear menu
        </Button>
      </div>
      <div className="menu-web-list_items">
        <DragSortableList items={listItems} type="vertical" onSort={onSort} />
        <AddMenuModal
          showModal={showModal}
          setShowModal={setShowModal}
          setRealoadMenu={setRealoadMenu}
        />
        <EditMenuModal
          showEditModal={showEditModal}
          setShowEditModal={setShowEditModal}
          editModalContent={editModalContent}
          setRealoadMenu={setRealoadMenu}
        />
      </div>
    </div>
  );
}

function ListItems(props) {
  const { item, setRealoadMenu, setShowEditModal, setEditModalContent } = props;

  const activateMenu = (active) => {
    const token = getAccessTokenApi();
    updateMenuApi(token, item._id, { active }).then((response) => {
      notification["success"]({
        message: response.message,
      });
    });
  };

  const deleteMenu = (item) => {
    const token = getAccessTokenApi();

    deleteMenuApi(token, item._id).then((result) => {
      notification["success"]({ message: result.message });
      setRealoadMenu(true);
    });
  };

  const editMenu = (item) => {
    setShowEditModal(true);
    setEditModalContent(item._id);
  };

  return (
    <List.Item
      actions={[
        <Switch
          defaultChecked={item.active}
          onChange={(e) => activateMenu(e)}
        />,
        <Button
          title="Editar"
          type="primary"
          icon={<EditOutlined />}
          onClick={() => editMenu(item)}
        />,
        <Button
          title="Eliminar"
          type="primary"
          danger
          icon={<DeleteOutlined />}
          onClick={() => deleteMenu(item)}
        />,
      ]}
    >
      <List.Item.Meta title={item.title} description={item.url} />
    </List.Item>
  );
}
