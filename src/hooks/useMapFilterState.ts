import { useState, useCallback } from 'react'

export type ParkingStateType = boolean | undefined
export type PriceFilterType = 0 | 1 | 2 | 3 | 4
export type SquareFeetFilterType = 0 | 1 | 2 | 3 | 4
export type SortedType = 'CREATED_DESC' | 'PRICE_DESC' | 'PRICE_ASC' | 'SQUARE_DESC' | 'SQUARE_ASC'

export type ChangeFilterArg = {
  filterType: 'isParking' | 'price' | 'square' | 'sort'
  value: ParkingStateType | PriceFilterType | SquareFeetFilterType | SortedType
}

function isSortedType(value: any): value is SortedType {
  return ['CREATED_DESC', 'PRICE_DESC', 'PRICE_ASC', 'SQUARE_DESC', 'SQUARE_ASC'].includes(value)
}

function isSquareFeetFilterType(value: any): value is SquareFeetFilterType {
  return [0, 1, 2, 3, 4].includes(value)
}

function isPriceFilterType(value: any): value is SquareFeetFilterType {
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

  const changeFilter = useCallback(({ filterType, value }: ChangeFilterArg) => {
    switch (filterType) {
      case 'isParking': {
        if (isParkingStateType(value)) {
          setIsParking(value)
        }
        break
      }
      case 'price': {
        if (isPriceFilterType(value)) {
          setPriceFilter(value)
        }
        break
      }
      case 'square': {
        if (isSquareFeetFilterType(value)) {
          setSquerFeetFilter(value)
        }
        break
      }
      case 'sort': {
        if (isSortedType(value)) {
          setSorted(value)
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
