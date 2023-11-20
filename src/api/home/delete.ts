import api from '../axiosInstance'

export async function DeleteHome(id: number) {
  const { data } = await api.delete(`api/home/${id}`)
  return data
}
