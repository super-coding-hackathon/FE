import MapComponent from '../../components/map/MapComponent'
import { useRecoilState } from 'recoil'
import { useQuery } from '@tanstack/react-query'
import { getCategoryData } from '../../api/category/category'
import { apartCoords } from '../../atoms/coordsAtoms'
import { useQueryClient } from '@tanstack/react-query'
import { useCallback, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const Apart = () => {
  const [coords, setCoords] = useRecoilState(apartCoords)
  const qc = useQueryClient()
  const location = useLocation()

  const { data, isLoading } = useQuery(
    ['apart', coords],
    () => getCategoryData({ categoryId: 1, lat: coords.lat, lng: coords.lng }),
    // { enabled: false },
  )

  const chageCoords = useCallback((lat, lng) => {
    setCoords(() => ({ lat, lng }))
    qc.invalidateQueries(['apart'])
  }, [])

  return <MapComponent data={data?.data} handler={chageCoords} mapCoords={coords} />
}

export default Apart
