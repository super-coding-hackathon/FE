import api from '../../api/axiosInstance'

export const getCategoryData = async ({ categoryId, lat, lng }) => {
  // console.log('요청좌표', `lat: ${lat}`, `lng: ${lng}`)
  const response = await api.get(`/api/home?categoryId=${categoryId}&latitude=${lat}&longitude=${lng}`)

  // console.log('요청했을때 반환데이터', response.data.data)

  return response.data
}
