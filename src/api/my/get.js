import api from "../axiosInstance";

export async function GetMyInfo() {
  const { data } = await api.get("api/my-page");
  return data;
}
