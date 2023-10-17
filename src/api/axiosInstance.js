import axios from 'axios'

const api = axios.create({
  baseURL: `/api`, // 배포서버에는 이거
  // baseURL: `${process.env.REACT_APP_BASE_URL}`,
})

api.interceptors.request.use((request) => {
  const token = JSON.parse(sessionStorage.getItem('token'))

  if (token) {
    request.headers['Authorization'] = `Bearer ${token}`
  }

  return request
})

export default api
