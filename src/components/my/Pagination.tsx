import { FC } from 'react'
// import { TransactionDetail } from './type'

interface PaginationProps {
  // data: TransactionDetail[]
  hasNext: boolean
  hasPrevious: boolean
  totalElements: number
  totalPages: number
}

const Pagination: FC<PaginationProps> = () => {
  // console.log()
  return (
    <div className="pagination">
      <div className="page"></div>
    </div>
  )
}

export default Pagination
