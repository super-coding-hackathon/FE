import MapComponent from '../../components/map/MapComponent'
import { useRecoilState } from 'recoil'
import { useQuery } from '@tanstack/react-query'
import { officeCoords } from '../../atoms/coordsAtoms'
import { getCategoryData } from '../../api/category/category'
import { useQueryClient } from '@tanstack/react-query'
import { useCallback } from 'react'

const Office = () => {
  const [coords, setCoords] = useRecoilState(officeCoords)
  const qc = useQueryClient()

  const { data } = useQuery(['office', coords], () =>
    getCategoryData({ categoryId: 2, lat: coords.lat, lng: coords.lng }),
  )

  const chageCoords = useCallback((lat: number, lng: number) => {
    setCoords(() => ({ lat, lng }))
    qc.invalidateQueries(['office'])
  }, [])

  return <MapComponent data={data?.data} handler={chageCoords} mapCoords={coords} category={'office'} />
}

export default Office
