import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Icon, Input, Avatar, Form, Select, Button, Row, Col } from "antd";
import NoAvatar from "../../../../assets/img/no-avatar.png";

import "./EditUserForm.scss";

export default function EditUserForm(props) {
  const { user } = props;
  const [avatar, setAvatar] = useState(null);

  console.log(avatar);
  return (
    <div className="edit-user-form">
      <UploadAvatar avatar={avatar} setAvatar={setAvatar} />
      <h3>{user.email}</h3>
    </div>
  );
}

//Componente para subir el avatar de perfil, ver: https://react-dropzone.js.org/
function UploadAvatar(props) {
  const { avatar, setAvatar } = props;
  //Callback para cuando un drop event ocurre.
  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      setAvatar({ file, preview: URL.createObjectURL(file) });
    },
    [setAvatar]
  );

  //Aqui configuro los parametros que recibo al arrastrar un archivo
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/png, image/jpeg",
    noKeyboard: true,
    onDrop,
  });

  return (
    <div className="upload-avatar" {...getRootProps()}>
      <input {...getInputProps()} />
      {/* Si isDrag esta activo, muestro el avatar default, 
      de lo contrario muestro el que subio el usuario */}
      {isDragActive ? (
        <Avatar size={150} src={NoAvatar} />
      ) : (
        //Si avatar tiene contenido, lo muestro, de lo contrario muestro el defaultet
        <Avatar size={150} src={avatar ? avatar.preview : NoAvatar} />
      )}
    </div>
  );
}
