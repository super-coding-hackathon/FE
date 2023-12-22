import { ChangeEvent } from 'react'

export interface FormDataType {
  address: string
  detailAddress: string
  categoryId: string
  deposit: number | null
  floor: number | null
  imageFiles: File[] | string[] | null
  isParking: boolean
  latitude: number | null //위도(소수점 6자리)
  longitude: number | null //위도(소수점 6자리)
  maintenanceFee: number | null
  mapId: string | undefined // 카카오 map Id
  price: number
  name: string
  roadAddress: string
  squareFeet: number | null
  thumbnailImage: File | string[] | null
  transactionType: string
}

export interface StepProps {
  handle: {
    clickPost: () => void
    selectAddress: (data: { address: string; roadAddress: string }) => void
    onChangeInput: (e: ChangeEvent<HTMLInputElement>) => void
    onChangeSelect: (e: { name: string; value: string }) => void
    onChangeNumber: (e: ChangeEvent<HTMLInputElement>) => void
    onChangeCheck: (e: ChangeEvent<HTMLInputElement>) => void
  }
  formData: FormDataType
  setFormData: React.Dispatch<React.SetStateAction<FormDataType>>
  step: number
  setStep: (step: number) => void
  openPostCode?: boolean
  setOpenPostCode?: (value: boolean) => void
  imgListUrl?: string[]
  Thumbnail?: string[]
}

export interface InvalidateErrors {
  address?: string
  detailAddress?: string
  categoryId?: string
  transactionType?: string
  deposit?: string
  name?: string
  squareFeet?: string
  floor?: string
  maintenanceFee?: string
}
