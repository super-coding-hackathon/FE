import { useRef, useEffect, useCallback, forwardRef } from 'react'
import generateMap from '../../util/generateMap'
import styled from 'styled-components'
import ReactDOMServer from 'react-dom/server'
import Overlay from './Overlary'
import SaleListItem from './SaleListItem'

const { kakao } = window

const MapComponent = ({ data, handler }, ref) => {
  const map = useRef()

  const handleDragEnd = useCallback((map) => {
    const coords = map.getCenter()
    // console.log('중심 좌표', coords.getLat(), coords.getLng())
    // console.log('현재 데이터', data[0])
    if (handler) {
      handler(coords.getLat(), coords.getLng())
    }
  }, [])

  useEffect(() => {
    const mapDiv = document.getElementById('map')
    map.current = generateMap(mapDiv)
    const eventHandler = () => {
      handleDragEnd(map.current)
    }
    console.log('마운트')
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

  return (
    <Wrap>
      <div id="map"></div>
      <ListUl>
        {data.map((sale) => (
          <SaleListItem key={sale.homeId} {...sale} />
        ))}
      </ListUl>
    </Wrap>
  )
}

export default forwardRef(MapComponent)

const Wrap = styled.div`
  display: grid;
  grid-template-columns: 1fr 300px;
  height: 100%;
`

const ListUl = styled.ul`
  overflow: scroll;
`
