import MapComponent from '../../components/map/MapComponent'
import { useRecoilState } from 'recoil'
import { officeCoords } from '../../atoms/coordsAtoms'
import { useCallback } from 'react'

const Office = () => {
  const [coords, setCoords] = useRecoilState(officeCoords)

  const chageCoords = useCallback((lat: number, lng: number) => {
    setCoords(() => ({ lat, lng }))
  }, [])

  return <MapComponent handler={chageCoords} mapCoords={coords} category={2} />
}

export default Office
