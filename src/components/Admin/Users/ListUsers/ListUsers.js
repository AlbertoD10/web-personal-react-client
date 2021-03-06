import React, { useState, useEffect } from "react";
import {
  Switch,
  List,
  Avatar,
  Button,
  notification,
  Modal as ModalDelete,
} from "antd";
import {
  EditOutlined,
  StopOutlined,
  DeleteOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import Modal from "../../../Modal";
import EditUserForm from "../EditUserForm/";
import {
  getAvatarApi,
  activateUserApi,
  deleteUserApi,
} from "../../../../api/user";
import { getAccessTokenApi } from "../../../../api/auth";
import NoAvatar from "../../../../assets/img/no-avatar.png";
import AddUserForm from "../AddUserForm/AddUserForm";
import "./ListUsers.scss";

const { confirm } = ModalDelete;

export default function ListUsers(props) {
  const { usersActive, usersInactive, setRealoadUser } = props;
  const [viewUsersActive, setViewUsersActive] = useState(true);
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [modalTitle, setModalTitle] = useState("");
  const [addUserModal, setAddUserModal] = useState(false);

  return (
    <div className="list-users">
      <div className="list-users-header">
        <div className="list-users-header__switch">
          <Switch
            defaultChecked
            onChange={() => setViewUsersActive(!viewUsersActive)}
          />
          <span>
            {viewUsersActive ? "Usuarios activos" : "Usuarios inactivos"}
          </span>
        </div>
        <Button
          type="primary"
          onClick={() => {
            setAddUserModal(true);
          }}
        >
          Crear usuario
        </Button>
      </div>
      <AddUserForm
        addUserModal={addUserModal}
        setAddUserModal={setAddUserModal}
        setRealoadUser={setRealoadUser}
      />
      {/* Renderizo la lista de usuarios activos e inactivos */}
      {viewUsersActive ? (
        <UsersActive
          usersActive={usersActive}
          setIsVisibleModal={setIsVisibleModal}
          setModalContent={setModalContent}
          setModalTitle={setModalTitle}
          setRealoadUser={setRealoadUser}
        />
      ) : (
        <UsersInactive
          usersInactive={usersInactive}
          setRealoadUser={setRealoadUser}
        />
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

//Renderizo la lista los usuarios activos
function UsersActive(props) {
  const {
    usersActive,
    setIsVisibleModal,
    setModalContent,
    setModalTitle,
    setRealoadUser,
  } = props;

  //Funcion para mostrar el componente de editar usuarios
  const editUser = (user) => {
    setIsVisibleModal(true);
    setModalTitle(`Editar: ${user.name} ${user.lastname}`);
    setModalContent(
      <EditUserForm
        user={user}
        setIsVisibleModal={setIsVisibleModal}
        setRealoadUser={setRealoadUser}
      />
    );
  };

  return (
    <List
      className="users-active"
      itemLayout="horizontal"
      dataSource={usersActive}
      renderItem={(user) => (
        <UserActive
          user={user}
          editUser={editUser}
          setRealoadUser={setRealoadUser}
        />
      )}
    />
  );
}

//Renderizo los objetos de los usuarios individualmente en la lista de usuarios
function UserActive(props) {
  const { user, editUser, setRealoadUser } = props;
  const [avatar, setAvatar] = useState(null);
  //Por cada usuario renderizado, realizo una peticion a la bd para actualizar su avatar
  useEffect(() => {
    if (user.avatar) {
      getAvatarApi(user.avatar).then((response) => {
        if (!response) {
          setAvatar(null);
        } else {
          setAvatar(response);
        }
      });
    }
  }, [user]);

  //Funcion para desactivar el usuario
  const desactivateUser = () => {
    const token = getAccessTokenApi();
    activateUserApi(token, false, user._id)
      .then((response) => {
        notification["success"]({ message: response.message });
        setRealoadUser(true);
      })
      .catch((err) => {
        notification["error"]({
          message: err.message,
        });
      });
  };

  //Funcion para confirmar la eliminacion del usuario
  const showDeleteConfirm = () => {
    const token = getAccessTokenApi();
    confirm({
      title: "Eliminar usuario",
      content: `Seguro que desea eliminar a ${user.email}`,
      centered: true,
      okText: "Eliminar",
      okType: "danger",
      onCancel: false,
      onOk() {
        deleteUserApi(token, user._id)
          .then((response) => {
            notification["success"]({ message: response.message });
          })
          .catch((err) => {
            notification["error"]({ message: err.message });
          });
        setRealoadUser(true);
      },
    });
  };

  return (
    <>
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
              desactivateUser();
            }}
          />,
          <Button
            title="Eliminar"
            type="primary"
            danger
            icon={<DeleteOutlined />}
            onClick={(e) => showDeleteConfirm()}
          />,
        ]}
      >
        <List.Item.Meta
          avatar={<Avatar src={avatar ? avatar : NoAvatar} />}
          title={`
          ${user.name ? user.name : "..."}
          ${user.lastname ? user.lastname : "..."}`}
          description={`Email: ${user.email}`}
        />
      </List.Item>
    </>
  );
}

//Renderizo los usuarios inactivos
function UsersInactive(props) {
  const { usersInactive, setRealoadUser } = props;

  return (
    <List
      className="users-active"
      itemLayout="horizontal"
      dataSource={usersInactive}
      renderItem={(user) => (
        <UserInactive user={user} setRealoadUser={setRealoadUser} />
      )}
    />
  );
}

function UserInactive(props) {
  const { user, setRealoadUser } = props;
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    if (user.avatar) {
      getAvatarApi(user.avatar).then((response) => {
        if (!response) {
          setAvatar(null);
        } else {
          setAvatar(response);
        }
      });
    }
  }, [user]);

  const activateUser = () => {
    const token = getAccessTokenApi();
    activateUserApi(token, true, user._id)
      .then((response) => {
        notification["success"]({ message: response.message });
        setRealoadUser(true);
      })
      .catch((err) => {
        notification["error"]({
          message: err.message,
        });
      });
  };

  const showDeleteConfirm = () => {
    const token = getAccessTokenApi();
    confirm({
      title: "Eliminar usuario",
      content: `Seguro que desea eliminar a ${user.email}`,
      centered: true,
      okText: "Eliminar",
      okType: "danger",
      onCancel: false,
      onOk() {
        deleteUserApi(token, user._id)
          .then((response) => {
            notification["success"]({ message: response.message });
          })
          .catch((err) => {
            notification["error"]({ message: err.message });
          });
        setRealoadUser(true);
      },
    });
  };

  return (
    <List.Item
      actions={[
        <Button
          title="Activar"
          type="primary"
          icon={<CheckOutlined />}
          onClick={() => {
            activateUser();
          }}
        />,
        <Button
          title="Eliminar"
          type="primary"
          danger
          icon={<DeleteOutlined />}
          onClick={() => showDeleteConfirm()}
        />,
      ]}
    >
      <List.Item.Meta
        avatar={<Avatar src={avatar ? avatar : NoAvatar} />}
        title={`
      ${user.name ? user.name : "..."}
       ${user.lastname ? user.lastname : "..."}`}
        description={`Email: ${user.email}`}
      />
    </List.Item>
  );
}
