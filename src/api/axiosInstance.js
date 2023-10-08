import axios from 'axios'

const api = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}/proxy/`,
})

api.interceptors.request.use((request) => {
  const token = JSON.parse(sessionStorage.getItem('token'))

  if (token) {
    request.headers['Authorization'] = `Bearer ${token}`
  }

  return request
})

export default api
