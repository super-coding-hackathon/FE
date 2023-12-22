import { FC } from 'react'
import * as S from '../../pages/transaction/transactionDetail.style'
import { TransactionDetail } from '../my/type'

interface StepProps {
  data: TransactionDetail
}

interface ListType {
  label: string
  index: number
}

const StepList: FC<StepProps> = ({ data }) => {
  const list = [
    { label: '거래신청', index: 1 },
    { label: '거래승인', index: 2 },
    { label: '계약검토', index: 3 },
    { label: '이체대기', index: 4 },
    { label: '이체검토', index: 5 },
    { label: '거래완료', index: 6 },
  ]

  const checkClass = (el: ListType) => {
    if (data.transactionStatus === '거래완료') {
      return 'complete'
    } else if (data.transactionStatusId > el.index) {
      return 'complete'
    } else if (data.transactionStatus === el.label) {
      return 'active'
    } else {
      return ''
    }
  }

  const listRender = () => {
    return list.map((el) => (
      <li className={checkClass(el)} key={el.index}>
        {el.label}
      </li>
    ))
  }

  return <S.StepListWrap>{listRender()}</S.StepListWrap>
}

export default StepList
