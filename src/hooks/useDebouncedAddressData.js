import { useEffect, useState } from 'react'
import search_address_by_keyword from '../api/search_address'
import useInput from './useInput'
import { useSetRecoilState } from 'recoil'
import { apartCoords, currentCoords, officeCoords, studioCoords } from '../atoms/coordsAtoms'
import { useNavigate } from 'react-router-dom'

const useDebouncedAddressData = (delay) => {
  const { value, setValue } = useInput('')
  const [selectedItem, setSelectedItem] = useState(null)
  const [data, setData] = useState([])
  const [open, setOpen] = useState(false)
  const setApartCoords = useSetRecoilState(apartCoords)
  const setOfficeCoords = useSetRecoilState(officeCoords)
  const setStudioCoords = useSetRecoilState(studioCoords)

  const navigate = useNavigate()

  const handleItemSelect = (item, category) => {
    setSelectedItem(item)
    setValue(item.place_name)
    setOpen(false)
    const coords = {
      lat: item.y,
      lng: item.x,
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

    navigate(`/${category}`, { state: { coords } })
  }

  const handleInputChange = (e) => {
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
        search_address_by_keyword(value, (result, status) => {
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
