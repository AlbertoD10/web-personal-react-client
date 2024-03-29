import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import routes from "./router/routes";
import AuthProvider from "./providers/AuthProvider";

import "./App.scss";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          {routes.map((route, index) => (
            <RouteWithSubRoutes key={index} {...route} />
          ))}
        </Switch>
      </Router>
    </AuthProvider>
  );
}
// A special wrapper for <Route> that knows how to
// handle "sub"-routes by passing them in a `routes`
// prop to the component it renders.
function RouteWithSubRoutes(route) {
  return (
    <Route
      path={route.path}
      // pass the sub-routes down to keep nesting
      render={(props) => <route.component {...props} routes={route.routes} />}
    />
  );
}

export default App;
