import api from "../axiosInstance";

export async function PutHome(id) {
  const { data } = await api.put(`api/home/${id}`);
  return data;
}
