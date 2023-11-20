import api from '../axiosInstance'

export async function GetMyInfo() {
  const { data } = await api.get('/api/my-page')
  return data.data
}

export async function GetMyBought(page: number, size: number) {
  const { data } = await api.get(`/api/my-page/buy`, { params: { page, size } })
  return data.data
}

export async function GetMyRegister(page: number, size: number) {
  const { data } = await api.get(`/api/my-page/home`, { params: { page, size } })
  return data.data
}

export async function GetMySold(page: number, size: number) {
  const { data } = await api.get(`/api/my-page/sell`, { params: { page, size } })
  return data.data
}

export async function GetTotalBuyStatus() {
  const { data } = await api.get(`/api/my-page/buy/status-count`)
  return data.data
}

export async function GetTotalSellStatus() {
  const { data } = await api.get(`/api/my-page/sell/status-count`)
  return data.data
}
