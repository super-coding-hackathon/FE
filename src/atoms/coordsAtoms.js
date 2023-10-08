import { atom } from 'recoil'

export const apartCoords = atom({
  key: 'apart',
  default: {
    lat: 37.498086,
    lng: 127.028001,
  },
})

export const studioCoords = atom({
  key: 'studio',
  default: {
    lat: 37.498086,
    lng: 127.028001,
  },
})

export const officeCoords = atom({
  key: 'office',
  default: {
    lat: 37.498086,
    lng: 127.028001,
  },
})
