import React, { useEffect, useState } from "react";
import { getUsersActiveApi } from "../../../api/user";
import { getAccessTokenApi } from "../../../api/auth";
import ListUsers from "../../../components/Admin/Users/ListUsers";
import "./Users.scss";

export default function Users() {
  const [usersActive, setUsersActive] = useState([]);
  const [usersInactive, setUsersInactive] = useState([]);
  const [reloadUser, setRealoadUser] = useState(false);
  const token = getAccessTokenApi();

  //useEffect porque es asincrono, y tengo que guardar los datos a medida
  //que van llegando

  useEffect(() => {
    //Primero entra y se busca todos users activos
    getUsersActiveApi(token, true).then((response) => {
      setUsersActive(response.users);
    });
    //Luego, vuelve a hacer la peticicon a buscar los users inactivos.
    getUsersActiveApi(token, false).then((response) => {
      setUsersInactive(response.users);
    });
    setRealoadUser(false); //Actualizo el usuario cada vez que la peticion se actualiza
  }, [token, reloadUser]);

  return (
    <div className="users">
      <ListUsers
        usersActive={usersActive}
        usersInactive={usersInactive}
        setRealoadUser={setRealoadUser}
      />
    </div>
  );
}
