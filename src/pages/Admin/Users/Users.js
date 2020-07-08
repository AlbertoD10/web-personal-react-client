import React, { useEffect, useState } from "react";
import { getUsersApi } from "../../../api/user";
import { getAccessTokenApi } from "../../../api/auth";
import "./Users.scss";

export default function Users() {
  const [users, setUsers] = useState([]);
  const token = getAccessTokenApi();

  //useEffect porque es asincrono, y tengo que guardar los datos a medidad
  //que van llegando
  useEffect(() => {
    getUsersApi(token).then((response) => {
      console.log(response);
      setUsers(response);
    });
  }, [token]);

  return <div>Lolazo</div>;
}
