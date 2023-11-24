import { atom } from 'recoil'

export const currentCategory = atom({
  key: 'category',
  default: 1,
})
