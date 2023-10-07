import api from "../axiosInstance";

export async function DeleteHome(id) {
  const { data } = await api.delete(`api/home/${id}`);
  return data;
}
