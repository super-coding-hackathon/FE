import MapComponent from '../../components/map/MapComponent'
import { useRecoilState } from 'recoil'
import { studioCoords } from '../../atoms/coordsAtoms'
import { useCallback } from 'react'

const Studio = () => {
  const [coords, setCoords] = useRecoilState(studioCoords)

  const chageCoords = useCallback((lat: number, lng: number) => {
    setCoords(() => ({ lat, lng }))
  }, [])

  return <MapComponent handler={chageCoords} mapCoords={coords} category={3} />
}

export default Studio
