import MapComponent from '../../components/map/MapComponent'
import { useRecoilState } from 'recoil'
import { useQuery } from '@tanstack/react-query'
import { studioCoords } from '../../atoms/coordsAtoms'
import { getCategoryData } from '../../api/category/category'

const Studio = () => {
  const [coords, setCoords] = useRecoilState(studioCoords)

  const { data, isLoading } = useQuery(['studio'], () =>
    getCategoryData({ categoryId: 3, lat: coords.lat, lng: coords.lng }),
  )

  const chageCoords = (lat, lng) => {
    setCoords({ lat, lng })
  }

  if (isLoading) return <div>로딩중...</div>
  return <MapComponent data={data.data} handler={chageCoords} />
}

export default Studio
