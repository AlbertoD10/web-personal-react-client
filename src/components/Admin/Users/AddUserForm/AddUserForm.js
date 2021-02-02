import React, { useState } from "react";
import {
  Modal,
  Form,
  Row,
  Col,
  Input,
  Select,
  Button,
  notification,
} from "antd";
import { UserOutlined, MailOutlined, LockOutlined } from "@ant-design/icons";
import { getAccessTokenApi } from "../../../../api/auth";
import { createNewUserApi } from "../../../../api/user";

export default function AddUserForm(props) {
  const { addUserModal, setAddUserModal, setRealoadUser } = props;
  return (
    <Modal
      visible={addUserModal}
      onCancel={() => setAddUserModal(false)}
      centered
      footer={null}
    >
      <h2 style={{ display: "flex", justifyContent: "center" }}>
        Crear nuevo usuario
      </h2>
      <AddForm
        setAddUserModal={setAddUserModal}
        setRealoadUser={setRealoadUser}
      />
    </Modal>
  );
}

function AddForm(props) {
  const { setAddUserModal, setRealoadUser } = props;
  const { Option } = Select;
  const [userData, setUserData] = useState({
    name: "",
    lastname: "",
    email: "",
    role: "",
    password: "",
    repeatPassword: "",
  });

  const onChangeForm = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const createUser = (e) => {
    const token = getAccessTokenApi();
    let userCreated = userData;

    if (!userCreated.name || !userCreated.email || !userCreated.lastname) {
      notification["error"]({
        message: "El nombre, apellido y Email son obligatorios.",
      });
      return;
    }
    if (!userCreated.password) {
      notification["error"]({
        message: "La contraseña es obligatoria",
      });
      return;
    }
    if (userCreated.password || userCreated.repeatPassword) {
      if (userCreated.password !== userCreated.repeatPassword) {
        notification["error"]({
          message: "Las contraseñas no coinciden",
        });
        return;
      }
    }
    createNewUserApi(token, userData).then((response) => {
      console.log(response);
      if (response.status !== 200) {
        notification["error"]({
          message: response.message,
        });
      } else {
        notification["success"]({
          message: response.message,
        });
        setUserData({
          name: "",
          lastname: "",
          email: "",
          role: "",
          password: "",
          repeatPassword: "",
        });
        setAddUserModal(false);
        setRealoadUser(true);
      }
    });
  };

  return (
    <Form
      className="edit-form"
      onFinish={createUser}
      onChange={(e) => onChangeForm(e)}
    >
      <Row gutter={24}>
        <Col xs={24} sm={12}>
          <Form.Item>
            <Input
              name="name"
              placeholder="Nombre"
              prefix={<UserOutlined />}
              value={userData.name}
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item>
            <Input
              name="lastname"
              placeholder="Apellido"
              prefix={<UserOutlined />}
              value={userData.lastname}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col xs={24} sm={12}>
          <Form.Item>
            <Input
              name="email"
              placeholder="Correo electónico"
              prefix={<MailOutlined />}
              value={userData.email}
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item>
            <Select
              onChange={(e) => setUserData({ ...userData, role: e })}
              placeholder="Role"
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
              name="password"
              placeholder="Contraseña"
              type="password"
              prefix={<LockOutlined />}
              value={userData.password}
            />
          </Form.Item>
        </Col>

        <Col xs={24} sm={12}>
          <Form.Item>
            <Input
              name="repeatPassword"
              placeholder="Repetir contraseña"
              type="password"
              prefix={<LockOutlined />}
              value={userData.repeatPassword}
            />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item>
        <Button
          className="btn-submit"
          type="primary"
          htmlType="submit"
          style={{ width: "100%" }}
        >
          Crear usuario
        </Button>
      </Form.Item>
    </Form>
  );
}
