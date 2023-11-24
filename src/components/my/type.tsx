export interface RenderProps {
  rendered: string
}

export interface TabProps extends RenderProps {
  setRendered: (value: string) => void
}

export interface SellerDetail {
  homeId: number
  accountNumber: string | null | undefined
  address: string
  deposit: number
  homeName: string
  buyer: string
  buyerContractFile: string | null | undefined
  seller?: string
  sellerContractFile?: string | null | undefined
  thumbnailUrl: string
  transactionId: number
  transactionStatus: string
  transactionStatusId: number
}

export interface BuyerDetail {
  homeId: number
  accountNumber: string | null | undefined
  address: string
  deposit: number
  homeName: string
  seller: string
  sellerContractFile: string | null | undefined
  buyer?: string
  buyerContractFile?: string | null | undefined
  thumbnailUrl: string
  transactionId: number
  transactionStatus: string
  transactionStatusId: number
}

export interface TransactionDetail {
  homeId: number
  accountNumber?: string | null | undefined
  address: string
  deposit: number
  homeName: string
  seller: string
  sellerContractFile: string | null | undefined
  buyer?: string
  buyerContractFile?: string | null | undefined
  thumbnailUrl: string
  transactionId: number
  transactionStatus: string
  transactionStatusId: number
}

export interface IncludePage<T> {
  contents: T[]
  hasNext: boolean
  hasPrevious: boolean
  totalElements: number
  totalPages: number
}

export interface ReceiptProps<T extends SellerDetail | BuyerDetail> extends RenderProps {
  data: IncludePage<T>
  setPage(newPage: number): void
  // page: number
  // prevPage(): void
  // nextPage(): void
}

export interface MyHomeType {
  address: string
  categoryName: string
  createdAt: string
  homeId: number
  homeName: string
  thumbnailUrl: string
  transactionType: string
}

export interface MyHomeList {
  contents: MyHomeType[]
  hasNext: boolean
  hasPrevious: boolean
  totalElements: number
  totalPages: number
}

export interface AccordionProps {
  data: SellerDetail | BuyerDetail
  id: number
  roll: '판매자' | '구매자'
}

export interface RequestDataType {
  id: number
  formData: FormData
}

export interface FileProps {
  // id: number
  // roll: string
  // transactionMutate: (requestData: RequestDataType) => void
  setSelectedDocument: (document: File | null) => void
}

export interface StatusType {
  statusName: string
  count: number
}

export interface HistoryProps extends TabProps {
  data: StatusType[] | undefined
  title: string
}
