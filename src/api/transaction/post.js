import api from '../axiosInstance'

export async function CreateTransaction(id) {
  const { data } = await api.post(`/api/transaction/${id}`)
  return data
}

export async function PostNextStep(obj) {
  console.log(obj)
  const { data } = await api.post(`/api/transaction/${obj.id}/next-step`, obj.formData)
  return data
}
