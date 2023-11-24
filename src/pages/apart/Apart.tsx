import MapComponent from '../../components/map/MapComponent'
import { useRecoilState } from 'recoil'
import { apartCoords } from '../../atoms/coordsAtoms'
import { useCallback } from 'react'

const Apart = () => {
  const [coords, setCoords] = useRecoilState(apartCoords)

  const changeCoords = useCallback((lat: number, lng: number) => {
    setCoords({ lat, lng })
  }, [])

  return <MapComponent handler={changeCoords} mapCoords={coords} category={1} />
}

export default Apart
