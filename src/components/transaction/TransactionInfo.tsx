import { FC } from 'react'
import { TransactionDetail } from '../my/type'
import * as S from '../../pages/transaction/transactionDetail.style'

interface TransactionInfoProps {
  data: TransactionDetail
  roll?: string
}

const TransactionInfo: FC<TransactionInfoProps> = ({ data, roll }) => {
  // console.log(roll)
  return (
    <S.TransactionItem>
      <li>
        <div className="title">건물 이미지</div>
        <div className="desc">
          <img src={data.thumbnailUrl} alt="thumbail" />
        </div>
      </li>
      <li>
        <div className="title">건물 명</div>
        <div className="desc">{data.homeName}</div>
      </li>
      <li>
        <div className="title">계약금</div>
        <div className="desc">{data.deposit}만원</div>
      </li>
      <li>
        <div className="title">주소</div>
        <div className="desc">{data.address}</div>
      </li>
      {roll === 'buy' ? (
        <li>
          <div className="title">판매자</div>
          <div className="desc">{data.seller}</div>
        </li>
      ) : (
        <li>
          <div className="title">구매자</div>
          <div className="desc">{data.buyer}</div>
        </li>
      )}
    </S.TransactionItem>
  )
}

export default TransactionInfo
