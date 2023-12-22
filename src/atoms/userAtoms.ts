import { atom } from 'recoil'

export const isLoggedInState = atom({
  key: 'login',
  default: false,
})
