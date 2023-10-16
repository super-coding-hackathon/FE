import { useRef, useEffect, useCallback, forwardRef } from 'react'
import generateMap from '../../util/generateMap'
import styled from 'styled-components'
import ReactDOMServer from 'react-dom/server'
import Overlay from './Overlary'
import SaleListItem from './SaleListItem'
import SearchComponent from '../SearchComponent'

const { kakao } = window

const MapComponent = ({ data, handler, mapCoords, category }) => {
  const map = useRef()
  const markerRefs = useRef({})

  const handleDragEnd = useCallback((map) => {
    const coords = map.getCenter()
    console.log('중심 좌표', coords.getLat(), coords.getLng())

    if (handler) {
      handler(coords.getLat(), coords.getLng())
    }
  }, [])

  const handleItemClick = (homeId) => {
    if (!markerRefs.current[homeId]) return

    const { center } = markerRefs.current[homeId]
    map.current.setCenter(center)
  }

  useEffect(() => {
    const mapDiv = document.getElementById('map')
    map.current = generateMap(mapDiv, {
      center: new window.kakao.maps.LatLng(parseFloat(mapCoords.lat), parseFloat(mapCoords.lng)),
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
        })

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
        {/* <SaleListItem />
        <SaleListItem />
        <SaleListItem />
        <SaleListItem />
        <SaleListItem />
        <SaleListItem />
        <SaleListItem />
        <SaleListItem />
        <SaleListItem />
        <SaleListItem /> */}
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
