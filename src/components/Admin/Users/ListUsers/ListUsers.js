import React, { useState } from "react";
import { Switch, List, Avatar, Button } from "antd";
import {
  EditOutlined,
  StopOutlined,
  DeleteOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import Modal from "../../../Modal";
import EditUserForm from "../EditUserForm/EditUserForm";

import NoAvatar from "../../../../assets/img/no-avatar.png";
import "./ListUsers.scss";

export default function ListUsers(props) {
  const { usersActive, usersInactive } = props;
  const [viewUsersActive, setViewUsersActive] = useState(true);
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [modalTitle, setModalTitle] = useState("");

  return (
    <div className="list-users">
      <div className="list-users__switch">
        <Switch
          defaultChecked
          onChange={() => setViewUsersActive(!viewUsersActive)}
        />
        <span>
          {viewUsersActive ? "Usuarios activos" : "Usuarios inactivos"}
        </span>
      </div>
      {/* Renderizo la lista de usuarios activos e inactivos */}
      {viewUsersActive ? (
        <UsersActive
          usersActive={usersActive}
          setIsVisibleModal={setIsVisibleModal}
          setModalContent={setModalContent}
          setModalTitle={setModalTitle}
        />
      ) : (
        <UsersInactive usersInactive={usersInactive} />
      )}

      {/* Modal de edicion de usuarios*/}
      <Modal
        isVisibleModal={isVisibleModal}
        setIsVisibleModal={setIsVisibleModal}
        modalTitle={modalTitle}
      >
        {modalContent}
      </Modal>
    </div>
  );
}

//Renderizo los usuarios activos
function UsersActive(props) {
  const {
    usersActive,
    setIsVisibleModal,
    setModalContent,
    setModalTitle,
  } = props;

  //Funcion para mostrar el componente de editar usuarios
  const editUser = (user) => {
    setIsVisibleModal(true);
    setModalTitle(`Editar: ${user.name} ${user.lastame}`);
    setModalContent(<EditUserForm user={user} />);
    console.log(user);
  };

  return (
    <List
      className="users-active"
      itemLayout="horizontal"
      dataSource={usersActive}
      renderItem={(user) => (
        <List.Item
          actions={[
            <Button
              title="Editar"
              type="primary"
              icon={<EditOutlined />}
              onClick={() => editUser(user)}
            />,
            <Button
              title="Activar/Desactivar"
              type="primary"
              danger
              icon={<StopOutlined />}
              onClick={() => {
                console.log("Activar user");
              }}
            />,
            <Button
              title="Eliminar"
              type="primary"
              danger
              icon={<DeleteOutlined />}
              onClick={() => {
                console.log("Eliminar user");
              }}
            />,
          ]}
        >
          <List.Item.Meta
            avatar={<Avatar src={user.avatar ? user.avatar : NoAvatar} />}
            title={`
            ${user.name ? user.name : "..."}
             ${user.lastname ? user.lastame : "..."}`}
            description={`Email: ${user.email}`}
          />
        </List.Item>
      )}
    />
  );
}

//Renderizo los usuarios inactivos
function UsersInactive(props) {
  const { usersInactive } = props;

  return (
    <List
      className="users-active"
      itemLayout="horizontal"
      dataSource={usersInactive}
      renderItem={(user) => (
        <List.Item
          actions={[
            <Button
              title="Activar"
              type="primary"
              icon={<CheckOutlined />}
              onClick={() => {
                console.log("Activar");
              }}
            />,
            <Button
              title="Eliminar"
              type="primary"
              danger
              icon={<DeleteOutlined />}
              onClick={() => {
                console.log("Eliminar user");
              }}
            />,
          ]}
        >
          <List.Item.Meta
            avatar={<Avatar src={user.avatar ? user.avatar : NoAvatar} />}
            title={`
              ${user.name ? user.name : "..."}
               ${user.lastname ? user.lastame : "..."}`}
            description={`Email: ${user.email}`}
          />
        </List.Item>
      )}
    />
  );
}
