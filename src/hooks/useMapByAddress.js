import { useEffect, useState, useRef } from 'react'
import useMap from './useMap'

const { kakao } = window
const ps = new kakao.maps.services.Places()

const useMapByAddress = (element, options) => {
  const [address, setAddress] = useState('')
  const map = useMap(element)
  const chageAddress = (newAddr) => {
    setAddress(newAddr)
  }
  const prevMarker = useRef(null)
  const prevInfo = useRef(null)
  const [mapData, setMapData] = useState()

  useEffect(() => {
    if (!address) return
    const debounce = setTimeout(() => {
      ps.keywordSearch(address, (result, status) => {
        if (status === kakao.maps.services.Status.OK) {
          const { x, y } = result[0]
          const coords = new kakao.maps.LatLng(y, x)

          setMapData(result[0])

          const marker = new kakao.maps.Marker({
            map,
            position: coords,
          })

          const info = new kakao.maps.InfoWindow({
            content: `<div style="width:150px;text-align:center;padding:6px 0;">${address}</div>`,
          })

          info.open(map, marker)

          map.setCenter(coords)

          prevMarker.current = marker
          prevInfo.current = info
        }
        if (status === kakao.maps.services.Status.ZERO_RESULT) {
          console.log('검색결과가 없습니다.')
        }
        if (status === kakao.maps.services.Status.ERROR) {
          console.log('에러 발생')
        }
      })
    }, 100)

    return () => {
      if (prevMarker.current) {
        prevMarker.current.setMap(null)
        prevMarker.current = null
      }
      if (prevInfo.current) {
        prevInfo.current.close()
        prevInfo.current = null
      }
      clearTimeout(debounce)
    }
  }, [address, map])
  //   console.log(mapData)
  return { chageAddress, mapData }
}

export default useMapByAddress
