import api from '../axiosInstance'

export async function CreateTransaction(id: number) {
  const { data } = await api.post(`/api/transaction/${id}`)
  return data
}

export async function PostNextStep(obj: { id: number; formData: FormData }) {
  const { data } = await api.post(`/api/transaction/${obj.id}/next-step`, obj.formData)
  return data
}
