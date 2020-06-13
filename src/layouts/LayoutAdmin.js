import React, { useState } from "react";
import { Layout } from "antd";
import { Route, Redirect } from "react-router-dom";
import MenuTop from "../components/Admin/MenuTop";
import LoadRoutesLayout from "../router/LoadRoutesLayout";
import MenuSider from "../components/Admin/MenuSider";
import AdminSignIn from "../pages/Admin/SignIn";

import "./LayoutAdmin.scss";

const { Header, Content, Footer } = Layout;

export default function LayoutAdmin(props) {
  const { routes } = props; //Recibo los props del app.js
  const [menuCollapsed, setMenuCollapsed] = useState(false);

  const user = null;

  //Si no tengo usuario logeado, lo envio a la pantalla de login
  if (!user) {
    return (
      <>
        <Route path="/admin/login" component={AdminSignIn} />
        <Redirect to="/admin/login" />
      </>
    );
  }

  return (
    <Layout>
      <MenuSider menuCollapsed={menuCollapsed} />
      <Layout className="layout-admin">
        <Header className="layou-admin__header">
          <MenuTop
            setMenuCollapsed={setMenuCollapsed}
            menuCollapsed={menuCollapsed}
          />
        </Header>
        <Content className="layout-admin__content">
          {/*Este componente me renderiza la pagina que me llega mediante la ruta */}
          <LoadRoutesLayout routes={routes} />
        </Content>
        <Footer className="layout-admin__footer">Alberto Dailey</Footer>
      </Layout>
    </Layout>
  );
}

// export function LoadRoutes(props) {
//   const { routes } = props;

//   return (
//     <Switch>
//       {routes.map((route, index) => (
//         <Route
//           key={index}
//           path={route.path}
//           exact={route.exact}
//           //Usamos component en lugar de render porque no utilizaremos
//           // mas componentes que cambien mediante la ruta
//           component={route.component}
//         />
//       ))}
//     </Switch>
//   );
// }
