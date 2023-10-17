import axios from 'axios'

const api = axios.create({
<<<<<<< HEAD
  baseURL: `${process.env.REACT_APP_BASE_URL}`,
=======
  baseURL: `/api`, // 배포서버에는 이거
  // baseURL: `${process.env.REACT_APP_BASE_URL}`,
>>>>>>> 1940b339b319a49a42400419bb3aa27ebec8565c
})

api.interceptors.request.use((request) => {
  const token = JSON.parse(sessionStorage.getItem('token'))

  if (token) {
    request.headers['Authorization'] = `Bearer ${token}`
  }

  return request
})

export default api
