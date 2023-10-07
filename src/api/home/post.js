import api from "../axiosInstance";

export async function CreateHome(formData) {
  const { data } = await api.post("api/home", formData);
  return data;
}
