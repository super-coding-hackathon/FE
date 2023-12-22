import axios from 'axios'

const api = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}`,
})

api.interceptors.request.use((request) => {
  const token = sessionStorage.getItem('token')

  if (token) {
    const parsedToken = JSON.parse(token)
    request.headers['Authorization'] = `Bearer ${parsedToken}`
  }

  return request
})

export default api
