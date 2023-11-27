import { useEffect, useState, useRef, RefObject } from 'react'
import useMap from './useMap'
import search_address_by_keyword from '../api/search_address'
import { IKakaoMarker, IKakaoInfoWindow } from 'sharekim-kakao-map-types'

export interface mapDataType {
  address_name: string
  category_group_code: string
  category_group_name: string
  category_name: string
  distance: string
  id: string
  phone: string
  place_name: string
  place_url: string
  road_address_name: string
  x: string
  y: string
}

const { kakao } = window

const useMapByAddress = (element: RefObject<HTMLDivElement>) => {
  const [address, setAddress] = useState('')
  const [mapData, setMapData] = useState<mapDataType>()
  const { map } = useMap(element)
  const prevMarker = useRef<IKakaoMarker | null>(null)
  const prevInfo = useRef<IKakaoInfoWindow | null>(null)

  const chageAddress = (newAddr: string) => {
    setAddress(newAddr)
  }

  useEffect(() => {
    if (!address) return
    const debounce = setTimeout(() => {
      search_address_by_keyword(address, (result: mapDataType[], status: any) => {
        if (status === kakao.maps.services.Status.OK) {
          const { x, y } = result[0]
          const coords = new kakao.maps.LatLng(parseFloat(y), parseFloat(x))

          setMapData(result[0])

          const marker = new kakao.maps.Marker({
            map,
            position: coords,
          })

          const info = new kakao.maps.InfoWindow({
            content: `<div style="width:150px;text-align:center;padding:6px 0;">${address}</div>`,
          })

          info.open(map, marker)
          if (map) {
            map.setCenter(coords)
          }

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

  return { chageAddress, mapData }
}

export default useMapByAddress
