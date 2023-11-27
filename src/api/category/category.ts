import api from '../axiosInstance'

interface Args {
  categoryId: number
  lat: number
  lng: number
  isParking?: boolean
  priceFilter: number
  squareFeetFilter: number
}

export const getCategoryData = async ({ categoryId, lat, lng, isParking, priceFilter, squareFeetFilter }: Args) => {
  const params = new URLSearchParams()
  params.append('categoryId', `${categoryId}`)
  params.append('latitude', `${lat}`)
  params.append('longitude', `${lng}`)
  params.append('priceFilter', `${priceFilter}`)
  params.append('squareFeetFilter', `${squareFeetFilter}`)
  if (isParking !== undefined) {
    params.append('isParking', `${isParking}`)
  }

  const response = await api.get(`/api/home?${params.toString()}`)

  return response.data.data
}
