export interface imgFilesType {
  imageUrl: string
  isThumbnail?: boolean
}

export interface EditFormDataType {
  address: string
  detailAddress: string
  categoryId: string
  deposit: number | null
  floor: number | null
  imageFiles: string[] | null
  isParking: boolean
  latitude: number | null //위도(소수점 6자리)
  longitude: number | null //위도(소수점 6자리)
  maintenanceFee: number | null
  mapId: string | undefined // 카카오 map Id
  price: number
  name: string
  roadAddress: string
  squareFeet: number | null
  thumbnailImage: string[] | null
  transactionType: string
}

export interface HomeDetailType {
  address: string
  categoryName: string
  createdAt: string
  deposit: number
  detailAddress: string
  floor: number
  homeId: number
  imageFiles: imgFilesType[]
  isParking: true
  maintenanceFee: number
  name: string
  price: number
  roadAddress: string
  seller: string
  squareFeet: number
  transactionType: string
  isMine: boolean
}

export interface InfoItemProps {
  title: string
  desc: string | number
}

export interface InfoTopProps {
  name: string
  seller: string
  createdAt: string
}
