import api from "../axiosInstance";

export async function CreateHome(formDataToSend) {
  const { data } = await api.post("api/home", formDataToSend);
  return data;
}
