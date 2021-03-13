import { basePath, apiVersion } from "./config";

export async function suscribeNewsletterApi(email) {
  const url = `${basePath}/${apiVersion}/suscribe-newsletter/${email.toLowerCase()}`;
  const params = {
    method: "POST",
  };

  try {
    const response = await fetch(url, params);
    const result = response.json();
    return result;
  } catch (error) {
    return error;
  }
}
