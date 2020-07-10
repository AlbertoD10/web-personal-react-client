import React, { useEffect, useState } from "react";
import { getUsersActiveApi } from "../../../api/user";
import { getAccessTokenApi } from "../../../api/auth";
import "./Users.scss";

export default function Users() {
  const [usersActive, setUsersActive] = useState([]);
  const [usersInactive, setUsersInactive] = useState([]);
  const token = getAccessTokenApi();

  //useEffect porque es asincrono, y tengo que guardar los datos a medida
  //que van llegando
  useEffect(() => {
    //Primero entra y se busca todos users activos
    getUsersActiveApi(token, true).then((response) => {
      console.log(response);
      setUsersActive(response);
    });
    //Luego, vuelve a hacer la peticicon a buscar los users inactivos.
    getUsersActiveApi(token, false).then((response) => {
      console.log(response);
      setUsersInactive(response);
    });
  }, [token]);

  return <div>Lolazo</div>;
}
