import { forwardRef, useCallback, useEffect, useRef } from 'react'
import { CoordsType } from './MapComponent'
import { IKakaoMap } from 'sharekim-kakao-map-types'
import ReactDOMServer from 'react-dom/server'
import Overlay from './Overlary'
import { useQuery } from '@tanstack/react-query'
import { getCategoryData } from '../../api/category/category'
import { MarkerArgs } from '../../hooks/useMap'
import { queryKeys } from '../../react_query/queryKey'
import { ParkingStateType, PriceFilterType, SquareFeetFilterType } from '../../hooks/useMapFilterState'

type DataType = {
  deposit: number
  homeId: number
  latitude: number
  longitude: number
  name: string
  price: number
  transactionType: string
}

type Props = {
  mapCoords: CoordsType
  map: IKakaoMap
  handler: (lat: number, lng: number) => void
  category: number
  addMarker: (marker: MarkerArgs) => void
  resetMarker: () => void
  isParking: ParkingStateType
  priceFilter: PriceFilterType
  squareFeetFilter: SquareFeetFilterType
}

const { kakao } = window

const MapOrigin = forwardRef<HTMLDivElement, Props>(
  ({ mapCoords, map, handler, category, addMarker, resetMarker, isParking, priceFilter, squareFeetFilter }, ref) => {
    const infowindowRefs = useRef<any>({})

    const { data } = useQuery<DataType[]>(
      [queryKeys.category, category, mapCoords.lat, mapCoords.lng, isParking, priceFilter, squareFeetFilter],
      () =>
        getCategoryData({
          categoryId: category,
          lat: mapCoords.lat,
          lng: mapCoords.lng,
          isParking,
          priceFilter,
          squareFeetFilter,
        }),
    )

    const handleDragEnd = useCallback((map: IKakaoMap) => {
      const coords = map.getCenter()
      console.log('중심 좌표', coords.getLat(), coords.getLng())

      if (handler) {
        handler(coords.getLat(), coords.getLng())
      }
    }, [])

    useEffect(() => {
      if (map) {
        const eventHandler = () => {
          handleDragEnd(map)
        }

        const mapsEvent = kakao.maps.event
        mapsEvent.addListener(map, 'dragend', eventHandler)
        return () => {
          mapsEvent.removeListener(map, 'dragend', eventHandler)
        }
      }
    }, [map])

    useEffect(() => {
      if (map) {
        console.log('좌표변경 동작')
        const center = new kakao.maps.LatLng(mapCoords.lat, mapCoords.lng)
        map.setCenter(center)
      }
    }, [map, mapCoords.lat, mapCoords.lng])

    useEffect(() => {
      if (data && map) {
        resetMarker()
        data.forEach((apart) => {
          const center = new kakao.maps.LatLng(apart.latitude, apart.longitude)
          const marker = new kakao.maps.Marker({
            map,
            position: center,
            clickable: true,
          })
          const infowindow = new kakao.maps.InfoWindow({
            content: ReactDOMServer.renderToString(<Overlay apartInfo={apart} />),
            removable: true,
          } as InfoWindowOptions)

          addMarker({ homeId: apart.homeId, marker, center })
          infowindowRefs.current[apart.homeId] = infowindow

          kakao.maps.event.addListener(marker, 'click', () => {
            infowindow.open(map, marker)
            map.setCenter(center)
          })

          kakao.maps.event.addListener(map, 'idle', () => {
            const bounds = map.getBounds()
            const markerPosition = infowindow.getPosition()

            if (!bounds.contain(markerPosition)) {
              infowindow.close()
            }
          })
        })
      }
    }, [data, map])

    return <div id="map" ref={ref}></div>
  },
)

export default MapOrigin
