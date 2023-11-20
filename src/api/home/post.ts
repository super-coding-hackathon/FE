import api from '../axiosInstance'

export async function CreateHome(formDataToSend: FormData) {
  const { data } = await api.post('api/home', formDataToSend)
  return data
}
