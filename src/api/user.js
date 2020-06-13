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
        //Si existe un usuario, devuelvo el objeto
        return result;
      }
      return result.message;
    })
    .catch((err) => {
      return err.message;
    });
}
