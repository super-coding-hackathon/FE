import api from '../axiosInstance'

export async function GetBuyDetail(transactionId) {
  const { data } = await api.get(`/api/my-page/buy/detail`, { params: { transactionId } })
  return data.data

  // try {
  //   const res = await api.get(`/api/my-page/buy/detail`, { params: { transactionId } })
  //   const data = res.data.data
  //   return data || undefined
  // } catch (error) {
  //   throw error
  // }
}

export async function GetSellDetail(transactionId) {
  const { data } = await api.get(`/api/my-page/sell/detail`, { params: { transactionId } })
  return data.data

  // try {
  //   const res = await api.get(`/api/my-page/sell/detail`, { params: { transactionId } })
  //   const data = res.data.data
  //   return data || undefined
  // } catch (error) {
  //   throw error
  // }
}
