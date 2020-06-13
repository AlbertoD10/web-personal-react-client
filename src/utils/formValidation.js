//Para valdiar la contraseña
export function minLengthValidation(inputData, minLength) {
  const { value } = inputData;

  if (value.length >= minLength) {
    inputData.classList.add("succes");
    return true;
  } else {
    inputData.classList.add("error");
    return false;
  }
}

//Funcion para validar el correo electronico
export function emailValidation(inputData) {
  const emailValid = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
  const { value } = inputData;

  //Formateo la clase
  removeClassErrorSuccess(inputData);

  //Esto me devuelve true o false de lo que encontro en la expresion regular
  const resultValidation = emailValid.test(value);

  if (resultValidation) {
    inputData.classList.add("success");
    return true;
  } else {
    inputData.classList.add("false");
    return false;
  }
}

//Esto me formatea la clase que llega
function removeClassErrorSuccess(inputData) {
  inputData.classList.remove("success");
  inputData.classList.remove("error");
}
