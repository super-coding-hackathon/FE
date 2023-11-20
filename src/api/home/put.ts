import api from '../axiosInstance'

interface PutHomeParams {
  id: string
  formDataToSend: FormData
}

export async function PutHome({ id, formDataToSend }: PutHomeParams) {
  const { data } = await api.put(`api/home/${id}`, formDataToSend)
  return data
}
