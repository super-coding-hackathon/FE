import api from "../axiosInstance";

export async function GetHomeList() {
  const { data } = await api.get("api/home");
  return data;
}

export async function GetHomeDetail(id) {
  const { data } = await api.get(`api/home/${id}`);
  return data;
}
