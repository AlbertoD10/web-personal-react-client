import React, { useState } from "react";
import { Form, Input, Button, notification } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../../utils/constants";
import { signInApi } from "../../../api/user";

import "./LoginForm.scss";

export default function LoginForm() {
  const [inputs, setInputs] = useState({ email: "", password: "" });
  const [rulesMessages, setRulesMessages] = useState({}); //Con esto manejo los mensajes de feedBack en los forms

  const onChangeForm = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const login = async () => {
    const result = await signInApi(inputs);
    const { accessToken, refreshToken } = result;

    //Si hay mensaje de error
    if (result.message) {
      notification["error"]({ message: result.message });
      setRulesMessages({
        ...rulesMessages,
        help: result.message,
        validateStatus: "error",
      });
    }
    //De otro modo, guardo el token en el local storage
    else {
      localStorage.setItem(ACCESS_TOKEN, accessToken);
      localStorage.setItem(REFRESH_TOKEN, refreshToken);
      notification["success"]({ message: "Todo fino" });
      //  window.location.href = "/admin";
    }
  };

  return (
    <Form className="login-form" onChange={onChangeForm} onFinish={login}>
      <h2>Iniciar sesión</h2>
      <Form.Item
        name="email"
        rules={[
          {
            required: true,
            message: "Debe ingresar su email",
          },
        ]}
        {...rulesMessages}
      >
        <Input
          name="email"
          className="login-form__input"
          type="email"
          placeholder="Email"
          prefix={<UserOutlined className="site-form-item-icon" />}
        />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[{ required: true, message: "Debe ingresar la contraseña" }]}
        {...rulesMessages}
      >
        <Input
          name="password"
          className="login-form__input"
          placeholder="Contraseña"
          type="password"
          prefix={<LockOutlined className="site-form-item-icon" />}
        />
      </Form.Item>
      <Form.Item>
        {/* <Button>Enviar</Button> */}
        <button>Enviar</button>
      </Form.Item>
    </Form>
  );
}
