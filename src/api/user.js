import { basePath, apiVersion } from "./config";

//Creo funcion que conecta con el api
export function signUpApi(data) {
  const url = `${basePath}/${apiVersion}/sign-up`; //URL a la que enviare a la peticion
  const params = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  };

  //Le pongo return al fetch para que me retorne el valor y se guarde
  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      if (result.user) {
        //Si no existe usuario en la DB, lo creo y notifico
        return { ok: true, message: "Usuario creado correctamente" };
      }
      return { ok: false, message: result.message };
    })
    .catch((err) => {
      return { ok: false, message: err.message };
    });
}

//Funcion para loguear el usuario
export function signInApi(data) {
  const url = `${basePath}/${apiVersion}/sign-in`;
  const params = {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  };

  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return { message: err.message };
    });
}
//Obtengo todos los usuarios
export async function getUsersApi(token) {
  const url = `${basePath}/${apiVersion}/users`;
  const params = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  };

  try {
    const response = await fetch(url, params);
    const json = await response.json();
    return json;
  } catch (err) {
    return { message: err.message };
  }
}

//Recibir usuarios que estan activos
export async function getUsersActiveApi(token, status) {
  const url = `${basePath}/${apiVersion}/users-active?active=${status}`;
  const params = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  };

  try {
    const response = await fetch(url, params);
    const json = await response.json();
    return json;
  } catch (err) {
    return { message: err.message };
  }
}
