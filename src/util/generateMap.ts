import { ReactNode } from 'react'

const generateMap = (element: ReactNode, options = null) => {
  const defaultOptions = {
    center: new window.kakao.maps.LatLng(37.498086, 127.028001),
    level: 3,
  }
  return new window.kakao.maps.Map(element, !options ? defaultOptions : options)
}

export default generateMap
