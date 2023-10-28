import MapComponent from '../../components/map/MapComponent'
import { useRecoilState } from 'recoil'
import { useQuery } from '@tanstack/react-query'
import { getCategoryData } from '../../api/category/category'
import { apartCoords } from '../../atoms/coordsAtoms'
import { useQueryClient } from '@tanstack/react-query'
import { useCallback } from 'react'

const Apart = () => {
  const [coords, setCoords] = useRecoilState(apartCoords)
  const qc = useQueryClient()

  const { data } = useQuery(['apart', coords], () =>
    getCategoryData({ categoryId: 1, lat: coords.lat, lng: coords.lng }),
  )

  const chageCoords = useCallback((lat: number, lng: number) => {
    setCoords(() => ({ lat, lng }))
    qc.invalidateQueries(['apart'])
  }, [])

  return <MapComponent data={data?.data} handler={chageCoords} mapCoords={coords} category={'apart'} />
}

export default Apart
