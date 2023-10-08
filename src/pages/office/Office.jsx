import MapComponent from '../../components/map/MapComponent'
import { useRecoilState } from 'recoil'
import { useQuery } from '@tanstack/react-query'
import { officeCoords } from '../../atoms/coordsAtoms'
import { getCategoryData } from '../../api/category/category'

const Office = () => {
  const [coords, setCoords] = useRecoilState(officeCoords)

  const { data, isLoading } = useQuery(['office'], () =>
    getCategoryData({ categoryId: 2, lat: coords.lat, lng: coords.lng }),
  )

  const chageCoords = (lat, lng) => {
    setCoords({ lat, lng })
  }

  if (isLoading) return <div>로딩중...</div>
  return <MapComponent data={data.data} handler={chageCoords} />
}

export default Office
