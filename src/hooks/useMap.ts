import { useState, useEffect, RefObject, useCallback } from 'react'
import generateMap from '../util/generateMap'
import { IKakaoLatLng, IKakaoMarker } from 'sharekim-kakao-map-types'

interface Marker {
  marker: IKakaoMarker
  center: IKakaoLatLng
}

interface Markers {
  [homeId: number]: Marker
}

export interface MarkerArgs extends Marker {
  homeId: number
}

const useMap = (mapRef: RefObject<HTMLDivElement>) => {
  const [map, setMap] = useState<any>()

  const [markers, setMarkers] = useState<Markers>({})

  const resetMarker = useCallback(() => {
    setMarkers({})
  }, [])

  const addMarker = useCallback(({ homeId, marker, center }: MarkerArgs) => {
    setMarkers((prev) => ({ ...prev, [homeId]: { marker, center } }))
  }, [])

  useEffect(() => {
    if (mapRef.current instanceof HTMLDivElement) {
      setMap(generateMap(mapRef.current))
    }
  }, [])

  return { map, markers, resetMarker, addMarker }
}

export default useMap
