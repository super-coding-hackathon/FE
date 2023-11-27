import { useState, useCallback } from 'react'

export type ParkingStateType = boolean | undefined
export type PriceFilterType = 0 | 1 | 2 | 3 | 4
export type SquareFeetFilterType = 0 | 1 | 2 | 3 | 4
export type SortedType = 'CREATED_DESC' | 'PRICE_DESC' | 'PRICE_ASC' | 'SQUARE_DESC' | 'SQUARE_ASC'

type ChangeFilterArg = {
  filterType: 'isParking' | 'price' | 'square' | 'sort'
  value: ParkingStateType | PriceFilterType | SquareFeetFilterType | SortedType
}

function isSortedType(value: any): value is SortedType {
  return ['CREATED_DESC', 'PRICE_DESC', 'PRICE_ASC', 'SQUARE_DESC', 'SQUARE_ASC'].includes(value)
}

function isSquareFeetFilterType(value: any): value is SquareFeetFilterType {
  return [0, 1, 2, 3, 4].includes(value)
}

function isSPriceFilterType(value: any): value is SquareFeetFilterType {
  return [0, 1, 2, 3, 4].includes(value)
}

function isParkingStateType(value: any): value is ParkingStateType {
  return typeof value === 'boolean' || typeof value === 'undefined'
}

const useMapFilterState = () => {
  const [isParking, setIsParking] = useState<ParkingStateType>(undefined)
  const [priceFilter, setPriceFilter] = useState<PriceFilterType>(0)
  const [squareFeetFilter, setSquerFeetFilter] = useState<SquareFeetFilterType>(0)
  const [sorted, setSorted] = useState<SortedType>('CREATED_DESC')

  const changeFilter = useCallback((filterState: ChangeFilterArg) => {
    switch (filterState.filterType) {
      case 'isParking': {
        if (isParkingStateType(filterState.value)) {
          setIsParking(filterState.value)
        }
        break
      }
      case 'price': {
        if (isSPriceFilterType(filterState.value)) {
          setPriceFilter(filterState.value)
        }
        break
      }
      case 'square': {
        if (isSquareFeetFilterType(filterState.value)) {
          setSquerFeetFilter(filterState.value)
        }
        break
      }
      case 'sort': {
        if (isSortedType(filterState.value)) {
          setSorted(filterState.value)
        }
        break
      }
    }
  }, [])

  return {
    isParking,
    priceFilter,
    squareFeetFilter,
    sorted,
    changeFilter,
  }
}

export default useMapFilterState
