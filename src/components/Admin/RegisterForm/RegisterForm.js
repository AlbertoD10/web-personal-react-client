import React, { useState } from "react";
import { Form, Checkbox, Input, notification } from "antd";
import { UserOutlined, LockFilled } from "@ant-design/icons";
import {
  minLengthValidation,
  emailValidation,
} from "../../../utils/formValidation";
import { signUpApi } from "../../../api/user";

import "./RegisterForm.scss";

export default function RegisterForm() {
  //Estado para guardar la informacion del formulario
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    repeatPassword: "",
    privacyPolicy: false,
  });
  //Estado para validar el formulario
  const [formValid, setFormValid] = useState({
    email: false,
    password: false,
    repeatPassword: false,
    privacyPolicy: false,
  });

  //Validar la informacion del input del form
  const inputValidation = (e) => {
    const { type, name } = e.target;

    if (type === "email") {
      setFormValid({
        ...formValid,
        [name]: emailValidation(e.target),
      });
    }
    if (type === "password") {
      setFormValid({
        ...formValid,
        [name]: minLengthValidation(e.target, 6),
      });
    }
    if (type === "checkbox") {
      setFormValid({
        ...formValid,
        [name]: e.target.checked,
      });
    }
  };

  //Funcion para cambiar los valores del formulario al ingresarlos
  const changeForm = (e) => {
    //Si el chequed se modifica, entonces le paso el estado actual del input
    if (e.target.name === "privacyPolicy") {
      setInputs({
        ...inputs,
        [e.target.name]: e.target.checked,
      });
    } else {
      //De otro modo, modifico los campos que cambien
      setInputs({
        ...inputs,
        [e.target.name]: e.target.value,
      });
    }
  };

  //Para resetar los campos del formulario al crear el usuario
  const resetForm = () => {
    setFormValid({
      email: false,
      password: false,
      repeatPassword: false,
      privacyPolicy: false,
    });
    setInputs({
      email: "",
      password: "",
      repeatPassword: "",
      privacyPolicy: false,
    });
  };

  //Al hacer submit al formulario
  const register = async (e) => {
    const { email, password, repeatPassword } = formValid;
    if (
      !inputs.email ||
      !inputs.password ||
      !inputs.repeatPassword ||
      !inputs.privacyPolicy
    ) {
      notification["error"]({ message: "Todos los campos son obligatorios." });
    } else {
      if (!email) {
        notification["error"]({ message: "Ingrese un correo valido" });
      } else if (!password || !repeatPassword) {
        notification["error"]({
          message: "La contraseña debe ser mayor a 6 caracteres",
        });
      }
      if (inputs.password !== inputs.repeatPassword) {
        notification["error"]({ message: "Las contraseñas no son iguales" });
      } else {
        //Conecto con el API
        const result = await signUpApi(inputs);
        if (!result.ok) {
          notification["error"]({ message: result.message });
        } else {
          notification["success"]({ message: result.message });
          resetForm();
        }
      }
    }
  };

  return (
    <Form className="register-form" onChange={changeForm} onFinish={register}>
      <h2>Llene los siguientes campos</h2>
      <Form.Item
        // name="correo"
        rules={[
          {
            //required: true,
            message: "Correo invalido ",
          },
        ]}
      >
        <Input
          className="register-form__input"
          name="email"
          type="email"
          placeholder="Correo electronico"
          prefix={<UserOutlined />}
          value={inputs.email}
          onChange={inputValidation}
        />
      </Form.Item>
      <Form.Item
        rules={[
          { required: true, message: "Tiene que ingresar una contrasña" },
        ]}
      >
        <Input
          className="register-form__input"
          name="password"
          type="password"
          placeholder="Contraseña"
          prefix={<LockFilled />}
          value={inputs.password}
          onChange={inputValidation}
        />
      </Form.Item>
      <Form.Item rules={[{ required: true, message: "Repita su contraseña" }]}>
        <Input
          className="register-form__input"
          name="repeatPassword"
          type="password"
          placeholder="Repita la contraseña"
          prefix={<LockFilled />}
          value={inputs.repeatPassword}
          onChange={inputValidation}
        />
      </Form.Item>
      <Form.Item>
        <Checkbox
          name="privacyPolicy"
          style={{ color: "white" }}
          checked={inputs.privacyPolicy}
          onChange={inputValidation}
        >
          Acepto los terminos y condiciones
        </Checkbox>
      </Form.Item>
      <Form.Item>
        {/* El boton de antd da problemas, asi que uso uno normal por mientas */}
        {/* <Button type="primary" htmlType="submit">
          Crear cuenta
        </Button> */}
        <button type="submit" style={{ color: "white" }}>
          Crear usuario
        </button>
      </Form.Item>
    </Form>
  );
}
