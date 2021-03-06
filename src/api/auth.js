import { ACCESS_TOKEN, REFRESH_TOKEN } from "../utils/constants";
import jwtDecode from "jwt-decode";
import { basePath, apiVersion } from "./config";

//Funcion para obtener el accessToken
export function getAccessTokenApi() {
  const accesToken = localStorage.getItem(ACCESS_TOKEN); //Obtengo el token del localStorage

  //Valido que si no recibo el token, entonces devuelvo null
  if (!accesToken || accesToken === null) {
    return null;
  }
  //De otro modo compruebo si el token caducó o no
  return willExpireToken(accesToken) ? null : accesToken;
  // Si el valor de la funcion es true, devuelvo null porque el token ya expiro,
  // de otro modo, devuelvo el token
}

//Funcion para obtener el refreshToken
export function getRefreshTokenApi() {
  const refreshToken = localStorage.getItem(REFRESH_TOKEN);

  if (!refreshToken || refreshToken === null) {
    return null;
  }
  return willExpireToken(refreshToken) ? null : refreshToken;
}

export function refreshAccessTokenApi(refreshToken) {
  const url = `${basePath}/${apiVersion}/refresh-access-token`;
  const bodyObj = { refreshToken: refreshToken };
  const params = {
    method: "POST",
    body: JSON.stringify(bodyObj),
    headers: {
      "Content-Type": "application/json",
    },
  };

  fetch(url, params)
    .then((response) => {
      if (!response.status !== 200) {
        return null;
      }
      return response.json();
    })
    .then((result) => {
      if (!result) {
        logout();
      } else {
        const { refreshToken, accesToken } = result;
        localStorage.setItem(ACCESS_TOKEN, accesToken);
        localStorage.setItem(REFRESH_TOKEN, refreshToken);
      }
    });
}

//Funcion para desloguear
export function logout() {
  localStorage.removeItem(ACCESS_TOKEN);
  localStorage.removeItem(REFRESH_TOKEN);
}

//Funcion para calcular si el token expirò
function willExpireToken(token) {
  const metaToken = jwtDecode(token); //Para decodificar el token
  const { exp } = metaToken; //Destructuring para sacar la fecha de expiracion del token
  const now = Date.now() * 0.001; //Con esto tranformo la fecha actual de milisegundos a segundos, dejandola en formato unix

  return now > exp;
  // Si now es mayor que la fecha de caducacion, entonces devuelvo
  // true y el token ya caduco, else devuelvo false y no ha caducado
}
