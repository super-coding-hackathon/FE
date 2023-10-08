import MapComponent from '../../components/map/MapComponent'
import { useRecoilState } from 'recoil'
import { useQuery } from '@tanstack/react-query'
import { studioCoords } from '../../atoms/coordsAtoms'
import { getCategoryData } from '../../api/category/category'
import { useQueryClient } from '@tanstack/react-query'
import { useCallback } from 'react'

const Studio = () => {
  const [coords, setCoords] = useRecoilState(studioCoords)
  const qc = useQueryClient()

  const { data, isLoading } = useQuery(['studio', coords], () =>
    getCategoryData({ categoryId: 3, lat: coords.lat, lng: coords.lng }),
  )

  const chageCoords = useCallback((lat, lng) => {
    setCoords(() => ({ lat, lng }))
    qc.invalidateQueries(['studio'])
  }, [])

  return <MapComponent data={data?.data} handler={chageCoords} />
}

export default Studio
