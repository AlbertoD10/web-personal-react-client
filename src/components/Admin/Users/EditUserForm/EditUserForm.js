import React, { useState, useEffect, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import {
  Input,
  Avatar,
  Form,
  Select,
  Button,
  Row,
  Col,
  notification,
} from "antd";
import NoAvatar from "../../../../assets/img/no-avatar.png";
import { UserOutlined, MailOutlined, LockOutlined } from "@ant-design/icons";
import {
  getAvatarApi,
  updateUserApi,
  uploadAvatarApi,
} from "../../../../api/user";
import { getAccessTokenApi } from "../../../../api/auth";

import "./EditUserForm.scss";
const { Option } = Select;

export default function EditUserForm(props) {
  const { user, setIsVisibleModal, setRealoadUser } = props;
  const [avatar, setAvatar] = useState(null);
  const [userData, setUserData] = useState({});

  //Para actualizar la información del usuario
  useEffect(() => {
    setUserData({
      name: user.name,
      lastname: user.lastname,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
    });
  }, [user]);

  //Hook para obtener la url de la imagen a mostrar al darle clic a editar
  useEffect(() => {
    if (user.avatar) {
      getAvatarApi(user.avatar).then((response) => {
        if (!response) {
          setAvatar(null);
        } else {
          setAvatar(response);
          console.log(response);
        }
      });
    }
  }, [user]);

  //Cuando se actualiza el avatar, se renderiza el cambio en la imagen
  useEffect(() => {
    if (avatar) {
      setUserData({ ...userData, avatar: avatar.file });
    }
  }, [avatar]);

  //Para actualizar los datos del usuario una vez editados
  // useEffect(() => {
  //   if (avatar) {
  //     setUserData({ ...userData, avatar: avatar.file });
  //   }
  // }, [avatar]);

  const updateUser = () => {
    const token = getAccessTokenApi();
    let userUpdate = userData;

    if (userUpdate.password || userUpdate.repeatPassword) {
      if (userUpdate.password !== userUpdate.repeatPassword) {
        notification["error"]({
          message: "Las contraseñas no coinciden",
        });
        return;
      } else {
        delete userUpdate.repeatPassword;
      }
    }

    if (!userUpdate.name || !userUpdate.email || !userUpdate.lastname) {
      notification["error"]({
        message: "El nombre, apellido y Email son obligatorios.",
      });
      return;
    }

    if (typeof userUpdate.avatar === "object") {
      uploadAvatarApi(token, userUpdate.avatar, user._id).then((response) => {
        userUpdate.avatar = response.user.avatar;
        updateUserApi(token, userUpdate, user._id).then((result) => {
          notification["success"]({
            message: result.message,
          });
          setIsVisibleModal(false);
          setRealoadUser(true);
        });
      });
    } else {
      updateUserApi(token, userUpdate, user._id).then((result) => {
        notification["success"]({
          message: result.message,
        });
        setIsVisibleModal(false);
        setRealoadUser(true);
      });
    }
  };

  return (
    <div className="edit-user-form">
      <UploadAvatar avatar={avatar} setAvatar={setAvatar} />
      <EditForm
        updateUser={updateUser}
        userData={userData}
        setUserData={setUserData}
      />
    </div>
  );
}
//Componente para subir el avatar de perfil, ver: https://react-dropzone.js.org/
function UploadAvatar(props) {
  const { avatar, setAvatar } = props;
  const [avatarUrl, setAvatarUrl] = useState(null);

  //Para visualizar la imagen del avatar en el editForm
  useEffect(() => {
    if (avatar) {
      if (avatar.preview) {
        setAvatarUrl(avatar.preview);
      } else {
        setAvatarUrl(avatar);
      }
    } else {
      setAvatarUrl(null);
    }
  }, [avatar]);

  //Callback para cuando un drop event ocurre.
  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      setAvatar({ file, preview: URL.createObjectURL(file) });
    },
    [setAvatar]
  );

  //Aqui configuro los parametros que recibo al arrastrar un archivo
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/png, image/jpeg",
    noKeyboard: true,
    onDrop,
  });

  return (
    <div className="upload-avatar" {...getRootProps()}>
      <input {...getInputProps()} />
      {/* Si isDrag esta activo, muestro el avatar default, 
      de lo contrario muestro el que subio el usuario */}
      {isDragActive ? (
        <Avatar size={150} src={NoAvatar} />
      ) : (
        //Si avatar tiene contenido, lo muestro, de lo contrario muestro el default
        <Avatar size={150} src={avatarUrl ? avatarUrl : NoAvatar} />
      )}
    </div>
  );
}

//Componente para editar la informacion del usuario
function EditForm(props) {
  const { updateUser, userData, setUserData } = props;

  return (
    <Form className="edit-form" onFinish={updateUser}>
      <Row gutter={24}>
        <Col xs={24} sm={12}>
          <Form.Item>
            <Input
              placeholder="Nombre"
              prefix={<UserOutlined />}
              value={userData.name}
              onChange={(e) =>
                setUserData({ ...userData, name: e.target.value })
              }
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item>
            <Input
              placeholder="Apellido"
              prefix={<UserOutlined />}
              value={userData.lastname}
              onChange={(e) =>
                setUserData({ ...userData, lastname: e.target.value })
              }
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col xs={24} sm={12}>
          <Form.Item>
            <Input
              placeholder="Correo electónico"
              prefix={<MailOutlined />}
              value={userData.email}
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item>
            <Select
              value={userData.role}
              onChange={(e) => setUserData({ ...userData, role: e })}
            >
              <Option value="admin">Administrador</Option>
              <Option value="editor">Editor</Option>
              <Option value="reader">Lector</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col xs={24} sm={12}>
          <Form.Item>
            <Input
              placeholder="Contraseña"
              type="password"
              prefix={<LockOutlined />}
              onChange={(e) =>
                setUserData({ ...userData, password: e.target.value })
              }
            />
          </Form.Item>
        </Col>

        <Col xs={24} sm={12}>
          <Form.Item>
            <Input
              placeholder="Repetir contraseña"
              type="password"
              prefix={<LockOutlined />}
              onChange={(e) =>
                setUserData({ ...userData, repeatPassword: e.target.value })
              }
            />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item>
        <Button className="btn-submit" type="primary" htmlType="submit">
          Actualizar datos
        </Button>
      </Form.Item>
    </Form>
  );
}
