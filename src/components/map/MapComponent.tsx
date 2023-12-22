import { useRef } from 'react'
import styled from 'styled-components'
import SearchComponent from '../SearchComponent'
import MapOrigin from './MapOrigin'
import useMap from '../../hooks/useMap'
import useMapFilterState from '../../hooks/useMapFilterState'
import SaleList from './SaleList'
import FilterMenu from './FilterCard'

export type CoordsType = {
  lat: number
  lng: number
}

type Props = {
  handler: (lat: number, lng: number) => void
  mapCoords: CoordsType
  category: number
}

const MapComponent = ({ handler, mapCoords, category }: Props) => {
  const mapRef = useRef<HTMLDivElement>(null)
  const { map, markers, resetMarker, addMarker } = useMap(mapRef)
  const { isParking, priceFilter, squareFeetFilter, sorted } = useMapFilterState()

  const handleItemClick = (homeId: number) => {
    if (markers[homeId]) {
      const { center } = markers[homeId]
      map.setCenter(center)
    }
  }

  return (
    <Wrap>
      <MapOrigin
        ref={mapRef}
        mapCoords={mapCoords}
        map={map}
        handler={handler}
        category={category}
        addMarker={addMarker}
        resetMarker={resetMarker}
        isParking={isParking}
        priceFilter={priceFilter}
        squareFeetFilter={squareFeetFilter}
      />
      <Search>
        <SearchComponent category={category} />
      </Search>
      <FilterMenu />
      <SaleList
        mapCoords={mapCoords}
        category={category}
        isParking={isParking}
        priceFilter={priceFilter}
        squareFeetFilter={squareFeetFilter}
        sorted={sorted}
        onItemClick={handleItemClick}
      />
    </Wrap>
  )
}

export default MapComponent

const Wrap = styled.div`
  display: flex;
  position: relative;
  height: 100%;

  #map {
    min-width: 1000px;
    width: 100%;
  }
`

const Search = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  width: 250px;
  z-index: 1;
`
