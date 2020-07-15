import React, { useState, useEffect, createContext } from "react";
import {
  getAccessTokenApi,
  getRefreshTokenApi,
  refreshAccessTokenApi,
  logout,
} from "../api/auth";
import jwtDecode from "jwt-decode";

//Creo el context que envuelve la aplicacion
export const AuthContext = createContext();

export default function AuthProvider(props) {
  const { children } = props; //Children es toda la pagina que se va a renderizar
  const [user, setUser] = useState({
    user: null,
    isLoading: true,
  });

  useEffect(() => {
    checkUserLogin(setUser);
  }, []);
  return <AuthContext.Provider value={user}> {children}</AuthContext.Provider>;
}

//Verificar si el usuario esta logeado
function checkUserLogin(setUser) {
  const accessToken = getAccessTokenApi();

  //Si el token de acceso no es valido, verifico con el refresh y en caso
  //de que tambien sea invalido, entonces deslogeo el user

  if (!accessToken) {
    const refreshToken = getRefreshTokenApi();

    if (!refreshToken) {
      logout();
      setUser({ user: null, isLoading: false });
    } else {
      //No ha caducado el token y revalido el access
      refreshAccessTokenApi(refreshToken);
    }
  } else {
    setUser({
      isLoading: false,
      user: jwtDecode(accessToken),
    });
  }
}
