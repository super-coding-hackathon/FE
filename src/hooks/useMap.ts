import { useState, useEffect, RefObject } from 'react'
import generateMap from '../util/generateMap'

const useMap = (mapRef: RefObject<HTMLElement>) => {
  const [map, setMap] = useState<any>()

  useEffect(() => {
    if (mapRef.current instanceof HTMLElement) {
      setMap(generateMap(mapRef.current))
    }
  }, [mapRef])

  return map
}

export default useMap
