import React from "react";

export default function EditUserForm(props) {
  const { email } = props;
  return (
    <div>
      <h3>{email}</h3>
    </div>
  );
}
