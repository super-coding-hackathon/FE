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

  const { data, isLoading } = useQuery(
    ['apart', coords],
    () => getCategoryData({ categoryId: 1, lat: coords.lat, lng: coords.lng }),
    // { cacheTime: 0, staleTime: 0 },
  )

  const chageCoords = useCallback((lat, lng) => {
    setCoords(() => ({ lat, lng }))
    qc.invalidateQueries(['apart'])
  }, [])

  if (isLoading) return <div>로딩중...</div>

  return <MapComponent data={data.data} handler={chageCoords} />
}

export default Apart
