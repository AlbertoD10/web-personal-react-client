import React from "react";
import { Layout, Tabs } from "antd";
import { Redirect } from "react-router-dom";
import Logo from "../../../assets/img/iconoLobo.png";
import LoginForm from "../../../components/Admin/LoginForm";
import RegisterForm from "../../../components/Admin/RegisterForm";
import { getAccessTokenApi } from "../../../api/auth";
import "./SignIn.scss";

const { Content } = Layout;
const { TabPane } = Tabs;

export default function SignIn() {
  //Si tengo un usuario logeado, redirijo a /admin para no mostrar el login
  if (getAccessTokenApi()) {
    return <Redirect to="/admin" />;
  }

  return (
    <Layout className="sign-in">
      <Content className="sign-in__content">
        <h1 className="sign-in__content-logo">
          <img src={Logo} alt="Alberto Web" />
        </h1>
        <div className="sign-in__content-tabs ">
          <Tabs size="large">
            <TabPane tab={<span>Entrar</span>} key="1">
              <LoginForm />
            </TabPane>
            <TabPane tab={<span>Registrarse</span>} key="2">
              <RegisterForm />
            </TabPane>
          </Tabs>
        </div>
      </Content>
    </Layout>
  );
}
