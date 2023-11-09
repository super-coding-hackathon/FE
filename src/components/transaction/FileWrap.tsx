import { FC } from 'react'
import { TransactionDetail } from '../my/type'
import * as S from '../../pages/transaction/transactionDetail.style'

interface TransactionFileProps {
  data: TransactionDetail
  roll?: string
}

const FileWrap: FC<TransactionFileProps> = ({ data, roll }) => {
  // console.log(data)
  // console.log(roll)
  return (
    <S.FileContainer>
      <li>
        <div className="title">파일 다운로드</div>
        {(roll === 'sold' && data.buyerContractFile === null) ||
          (roll === 'buy' && data.sellerContractFile === null && <span>다운로드할 파일이 없어요.</span>)}
      </li>
      <li>
        <div className="title">파일업로드</div>
      </li>
      <li>
        <div className="title">계좌번호 등록</div>
        {(roll === 'sold' && data.accountNumber === null) ||
          (roll === 'buy' && data.accountNumber === null && <span>등록된 계좌가 없어요.</span>)}
      </li>
      <div className="btn-container">
        <button>리스트 보러가기</button>
        <button>완료</button>
      </div>
    </S.FileContainer>
  )
}

export default FileWrap
