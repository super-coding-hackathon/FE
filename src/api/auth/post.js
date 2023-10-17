import api from '../axiosInstance'
console.log(api)

export async function SignUp(formData) {
  const { data } = await api.post('user/signup', formData)
  return data
}

export async function Login(formData) {
  const { data } = await api.post('user/login', formData)
  return data
}
