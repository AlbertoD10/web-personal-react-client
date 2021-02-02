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

//Subir la foto de perfil de los usuarios a la db

export function uploadAvatarApi(token, avatar, userId) {
  const url = `${basePath}/${apiVersion}/upload-avatar/${userId}`;

  const formData = new FormData();
  formData.append("avatar", avatar, avatar.name);

  const params = {
    method: "PUT",
    body: formData,
    headers: { Authorization: token },
  };

  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err.message;
    });
}

//Para obtener la foto de perfil del usuario

export function getAvatarApi(avatarName) {
  const url = `${basePath}/${apiVersion}/get-avatar/${avatarName}`;

  return fetch(url)
    .then((response) => {
      if (response.status !== 200) {
        return null;
      } else {
        return response.url;
      }
    })
    .catch((err) => {
      return err.message;
    });
}

//Para actualizar los datos del usuario

export function updateUserApi(token, user, userId) {
  const url = `${basePath}/${apiVersion}/update-user/${userId}`;
  const params = {
    method: "PUT",
    body: JSON.stringify(user),
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
  };

  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err.message;
    });
}

//Para activar y desactivar el usuario

export function activateUserApi(token, status, userId) {
  const url = `${basePath}/${apiVersion}/activate-user/${userId}`;
  const params = {
    method: "PUT",
    body: JSON.stringify({
      active: status,
    }),
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
  };

  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err.message;
    });
}

export function deleteUserApi(token, userId) {
  const url = `${basePath}/${apiVersion}/delete-user/${userId}`;
  const params = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  };

  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err.message;
    });
}

export function createNewUserApi(token, newUser) {
  const url = `${basePath}/${apiVersion}/sign-up-admin/`;
  const params = {
    method: "POST",
    body: JSON.stringify(newUser),
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  };

  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err.message;
    });
}
