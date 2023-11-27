import { useInfiniteQuery } from '@tanstack/react-query'
import axios from 'axios'
import styled from 'styled-components'
import { queryKeys } from '../../react_query/queryKey'
import { CoordsType } from './MapComponent'
import { ParkingStateType, PriceFilterType, SortedType, SquareFeetFilterType } from '../../hooks/useMapFilterState'
import SaleListItem from './SaleListItem'
import useIntersection from '../../hooks/useIntersection'

type Props = {
  mapCoords: CoordsType
  category: number
  isParking: ParkingStateType
  priceFilter: PriceFilterType
  squareFeetFilter: SquareFeetFilterType
  sorted: SortedType
  onItemClick: (homdId: number) => void
}

type DataType = {
  deposit: number
  homeId: number
  name: string
  price: number
  squareFeet: number
  transactionType: string
}

type Response = {
  homeLists: DataType[]
  nextCursorId: number | null
  nextCursorValue: number | null
}

const initParam = {
  nextCursorId: null,
  nextCursorValue: null,
}

const fetchBuildingList = async (query: string) => {
  const response = await axios.get(`http://13.209.89.233:8080/api/home/page?${query}`)

  return response
}

function SaleList({ mapCoords, category, isParking, priceFilter, squareFeetFilter, sorted, onItemClick }: Props) {
  const getNextPage = async ({ nextCursorId, nextCursorValue }: any) => {
    console.log('요청함수 커서', nextCursorId, nextCursorValue)
    const params = new URLSearchParams()
    params.append('categoryId', `${category}`)
    params.append('latitude', `${mapCoords.lat}`)
    params.append('longitude', `${mapCoords.lng}`)
    params.append('priceFilter', `${priceFilter}`)
    params.append('sortType', sorted)
    params.append('squareFeetFilter', `${squareFeetFilter}`)

    if (isParking !== undefined) {
      params.append('isParking', `${isParking}`)
    }

    if (nextCursorValue) {
      params.append('cursorValue', `${nextCursorValue}`)
    }
    if (nextCursorId) {
      params.append('cursorId', `${nextCursorId}`)
    }

    const response = await fetchBuildingList(`${params.toString()}`)

    return response.data.data
  }

  const { data, hasNextPage, fetchNextPage } = useInfiniteQuery<Response>(
    [queryKeys.list, category, mapCoords, isParking, priceFilter, squareFeetFilter, sorted],
    ({ pageParam = initParam }) => getNextPage(pageParam),
    {
      getNextPageParam: ({ nextCursorId, nextCursorValue }) => {
        return { nextCursorId, nextCursorValue }
      },
      refetchOnWindowFocus: false,
    },
  )

  const ref = useIntersection(fetchNextPage, hasNextPage)

  console.log(data)

  return (
    <ListUl>
      {data?.pages.map((page) =>
        page.homeLists.map((item) => <SaleListItem key={item.homeId} {...item} onClick={onItemClick} />),
      )}
      <ObeserverPoint ref={ref}></ObeserverPoint>
    </ListUl>
  )
}

export default SaleList

const ListUl = styled.ul`
  max-width: 400px;
  min-width: 300px;
  overflow-y: auto;
`

const ObeserverPoint = styled.div`
  height: 50px;
`
