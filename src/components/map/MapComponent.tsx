import { useRef, useEffect, useCallback } from 'react'
import generateMap from '../../util/generateMap'
import styled from 'styled-components'
import ReactDOMServer from 'react-dom/server'
import Overlay from './Overlary'
import SaleListItem from './SaleListItem'
import SearchComponent from '../SearchComponent'
import { IKakaoMap } from 'sharekim-kakao-map-types'

type CoordsType = {
  lat: number
  lng: number
}

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
  data: DataType[]
  handler: (lat: number, lng: number) => void
  mapCoords: CoordsType
  category: string
}

const { kakao } = window

const MapComponent = ({ data, handler, mapCoords, category }: Props) => {
  const map = useRef<any>()
  const markerRefs = useRef<any>({})

  const handleDragEnd = useCallback((map: IKakaoMap) => {
    console.log(map)
    const coords = map.getCenter()
    console.log('중심 좌표', coords.getLat(), coords.getLng())

    if (handler) {
      handler(coords.getLat(), coords.getLng())
    }
  }, [])

  const handleItemClick = (homeId: number) => {
    if (!markerRefs.current[homeId]) return

    const { center } = markerRefs.current[homeId]
    map.current.setCenter(center)
  }

  useEffect(() => {
    const mapDiv = document.getElementById('map') as HTMLElement
    map.current = generateMap(mapDiv, {
      center: new window.kakao.maps.LatLng(mapCoords.lat, mapCoords.lng),
    })
    const eventHandler = () => {
      handleDragEnd(map.current)
    }

    const mapsEvent = kakao.maps.event
    mapsEvent.addListener(map.current, 'dragend', eventHandler)

    return () => {
      mapsEvent.removeListener(map.current, 'dragend', eventHandler)
    }
  }, [])

  useEffect(() => {
    if (data) {
      data.forEach((apart) => {
        const center = new kakao.maps.LatLng(apart.latitude, apart.longitude)
        const marker = new kakao.maps.Marker({
          map: map.current,
          position: center,
          clickable: true,
        })

        markerRefs.current[apart.homeId] = { marker, center }

        const infowindow = new kakao.maps.InfoWindow({
          content: ReactDOMServer.renderToString(<Overlay apartInfo={apart} />),
          removable: true,
        } as InfoWindowOptions)

        kakao.maps.event.addListener(marker, 'click', () => {
          infowindow.open(map.current, marker)
          map.current.setCenter(center)
        })

        kakao.maps.event.addListener(map.current, 'idle', () => {
          const bounds = map.current.getBounds()
          const markerPosition = infowindow.getPosition()

          if (!bounds.contain(markerPosition)) {
            infowindow.close()
          }
        })
      })
    }
  }, [data])

  useEffect(() => {
    const center = new kakao.maps.LatLng(mapCoords.lat, mapCoords.lng)

    map.current.setCenter(center)
  }, [mapCoords])

  return (
    <Wrap>
      <div id="map"></div>
      <ListUl>
        {data?.map((sale) => (
          <SaleListItem key={sale.homeId} {...sale} onClick={() => handleItemClick(sale.homeId)} />
        ))}
      </ListUl>
      <Search>
        <SearchComponent category={category} />
      </Search>
    </Wrap>
  )
}

export default MapComponent

const Wrap = styled.div`
  height: 100%;
  display: flex;
  position: relative;
  /* background-color: pink; */
  width: 100%;
  padding: 0;
  height: calc(100vh - 95px);
  #map {
    max-width: 1300px;
    width: 100%;
    /* height: calc(100vh - 95px); */
    height: 100%;
  }
`

const Search = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  width: 250px;
  z-index: 1;
`

const ListUl = styled.ul`
  max-width: 300px;
  width: 100%;
  overflow-y: auto;
`
