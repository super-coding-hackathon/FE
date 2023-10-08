import axios from 'axios'

const api = axios.create({
  baseURL: `/api`,
})

api.interceptors.request.use((request) => {
  const token = JSON.parse(sessionStorage.getItem('token'))

  if (token) {
    request.headers['Authorization'] = `Bearer ${token}`
  }

  return request
})

export default api
