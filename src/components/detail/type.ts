export interface imgFilesType {
  imageUrl: string
  isThumbnail: boolean
}

export interface HomeDetailType {
  address: string
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
}
