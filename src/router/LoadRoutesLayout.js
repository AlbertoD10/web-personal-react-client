import React from "react";
import { Route, Switch } from "react-router-dom";

//Este componente me va a generar la ruta de la pagina en los Layouts
export default function LoadRoutesLayout(props) {
  const { routes } = props;

  return (
    <Switch>
      {routes.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          exact={route.exact}
          //Usamos component en lugar de render porque no utilizaremos
          // mas componentes que cambien mediante la ruta
          component={route.component}
        />
      ))}
    </Switch>
  );
}
