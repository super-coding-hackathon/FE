import api from '../axiosInstance'

export async function GetBuyDetail(transactionId: number) {
  const { data } = await api.get(`/api/my-page/buy/detail`, { params: { transactionId } })
  return data.data
}

export async function GetSellDetail(transactionId: number) {
  const { data } = await api.get(`/api/my-page/sell/detail`, { params: { transactionId } })
  return data.data
}
