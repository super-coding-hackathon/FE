import { IKakao } from 'sharekim-kakao-map-types'

declare global {
  interface Window {
    kakao: IKakao
  }
}

export {}
