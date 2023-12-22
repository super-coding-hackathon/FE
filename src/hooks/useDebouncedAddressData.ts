import { ChangeEvent, useEffect, useState } from 'react'
import search_address_by_keyword from '../api/search_address'
import useInput from './useInput'
import { useSetRecoilState } from 'recoil'
import { apartCoords, officeCoords, studioCoords } from '../atoms/coordsAtoms'
import { mapDataType } from './useMapByAddress'

const useDebouncedAddressData = (delay: number) => {
  const { value, setValue } = useInput('')
  const [selectedItem, setSelectedItem] = useState<any>(null)
  const [data, setData] = useState([])
  const [open, setOpen] = useState(false)
  const setApartCoords = useSetRecoilState(apartCoords)
  const setOfficeCoords = useSetRecoilState(officeCoords)
  const setStudioCoords = useSetRecoilState(studioCoords)

  const handleItemSelect = (item: mapDataType, category: number) => {
    console.log('검색 선택', category, item)
    setSelectedItem(item)
    setValue(item.place_name)
    setOpen(false)
    const coords = {
      lat: parseFloat(item.y),
      lng: parseFloat(item.x),
    }

    switch (category) {
      case 1:
        setApartCoords(coords)
        break
      case 2:
        setOfficeCoords(coords)
        break
      case 3:
        setStudioCoords(coords)
        break
      default:
        return
    }
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newSearchKeyword = e.target.value

    if (!selectedItem) {
      setValue(newSearchKeyword)
    } else if (newSearchKeyword !== selectedItem.place_name.trim()) {
      setSelectedItem(null)
      setValue(newSearchKeyword)
    }
  }

  useEffect(() => {
    if (value.trim().length === 0) {
      setData([])
    }

    if (!selectedItem && value.trim().length > 0) {
      const debounce = setTimeout(() => {
        search_address_by_keyword(value, (result: any) => {
          setData(result)
          setOpen(true)
        })
      }, delay)

      return () => {
        clearTimeout(debounce)
      }
    }
  }, [value, selectedItem, delay])

  return {
    handleItemSelect,
    handleInputChange,
    value,
    data,
    open,
  }
}

export default useDebouncedAddressData
