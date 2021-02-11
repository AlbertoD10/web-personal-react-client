import { basePath, apiVersion } from "./config";

export async function getMenuApi() {
  const url = `${basePath}/${apiVersion}/get-menu`;

  try {
    const response = await fetch(url);
    const result = response.json();
    return result;
  } catch (err) {
    return { message: err.message };
  }
}

export async function updateMenuApi(token, id, menuData) {
  const url = `${basePath}/${apiVersion}/update-menu/${id}`;
  const params = {
    method: "PUT",
    body: JSON.stringify(menuData),
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await fetch(url, params);
    const result = response.json();
    return result;
  } catch (error) {
    return { message: error.message };
  }
}

export async function addMenuApi(token, menuData) {
  const url = `${basePath}/${apiVersion}/add-menu`;
  const params = {
    body: JSON.stringify(menuData),
    method: "POST",
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await fetch(url, params);
    const result = response.json();
    return result;
  } catch (err) {
    return {
      message: err.message,
    };
  }
}

export async function deleteMenuApi(token, id) {
  const url = `${basePath}/${apiVersion}/delete-menu/${id}`;
  const params = {
    method: "DELETE",
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await fetch(url, params);
    const result = response.json();
    return result;
  } catch (err) {
    return { message: err.message };
  }
}
