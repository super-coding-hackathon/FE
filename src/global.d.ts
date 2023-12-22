import { IKakao, IKakaoInfoWindowOptions } from 'sharekim-kakao-map-types'

declare global {
  interface Window {
    kakao: IKakao
  }

  interface InfoWindowOptions extends IKakaoInfoWindowOptions {
    removable?: boolean
  }
}

// declare module '*.pdf'

export {}
