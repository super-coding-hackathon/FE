import api from '../../api/axiosInstance'

export const getCategoryData = async ({ categoryId, lat, lng }) => {
  const response = await api.get(`/api/home?categoryId=${categoryId}&latitude=${lat}&longitude=${lng}`)

  return response.data
}
