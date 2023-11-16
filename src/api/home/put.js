import api from '../axiosInstance'

export async function PutHome({ id, formDataToSend }) {
  // console.log(formDataToSend)
  const { data } = await api.put(`api/home/${id}`, formDataToSend)
  return data
}
