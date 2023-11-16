import { FC, useState } from 'react'
import { TransactionDetail } from '../my/type'
import * as S from '../../pages/transaction/transactionDetail.style'
import File from '../my/File'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { PostNextStep } from '../../api/transaction/post'
import { useNavigate, useParams } from 'react-router-dom'

interface TransactionFileProps {
  data: TransactionDetail
  roll?: string
}

const FileWrap: FC<TransactionFileProps> = ({ data, roll }) => {
  const navigate = useNavigate()

  const id = Number(useParams().transactionId)

  const [selectedDocument, setSelectedDocument] = useState<File | null>(null)

  const [account, setAccount] = useState<string>('')

  const queryClient = useQueryClient()

  const { mutate: transactionMutate } = useMutation(PostNextStep, {
    onSuccess: (res) => {
      console.log(res)
      queryClient.invalidateQueries(['soldInfo'])
      queryClient.invalidateQueries(['boughtInfo'])

      setSelectedDocument(null)
    },
  })

  const goBack = () => {
    navigate(-1)
  }

  const clickNextStep = () => {
    console.log('눌림')

    if (account === '' && !data.accountNumber) {
      console.log('파일 업로드')
      if (!selectedDocument) return

      const formData = new FormData()
      if (roll === 'sold') {
        formData.append('sellerContractFile', selectedDocument)
      } else if (roll === 'buy') {
        formData.append('buyerContractFile', selectedDocument)
      }
      let obj = {
        id,
        formData,
      }

      transactionMutate(obj)
    } else if (account || data.accountNumber) {
      console.log('계좌 업로드')
      if (!account && !data.accountNumber) return
      const formData = new FormData()
      const accountData = {
        accountNumber: account,
      }

      formData.append('nextStepRequest', new Blob([JSON.stringify(accountData)], { type: 'application/json' }))

      let obj = {
        id,
        formData,
      }
      // setInfo(formData)
      transactionMutate(obj)
    }
  }

  const statusUi = (step: string, roll: string) => {
    const value = `${roll}-${step}`
    // console.log(value)
    switch (value) {
      case `buy-거래신청`:
        return (
          <>
            <p>판매자가 받아줄 때 까지 기다려주세요.</p>
          </>
        )
      case `sold-거래신청`:
        return (
          <>
            <li>
              <div className="title">파일업로드</div>
              <File setSelectedDocument={setSelectedDocument} />
            </li>
          </>
        )
      case `buy-거래승인`:
        return (
          <>
            <li>
              <div className="title">파일 다운로드</div>
              {data.sellerContractFile && (
                <a href={data.sellerContractFile} target="_blank" rel="noopener noreferrer">
                  계약서 다운로드
                </a>
              )}
            </li>

            <li>
              <div className="title">파일업로드</div>
              <File setSelectedDocument={setSelectedDocument} />
            </li>
          </>
        )
      case `sold-거래승인`:
        // return
        return (
          <>
            <li>
              <div className="title">파일 다운로드</div>
              <span>아직 구매자가 파일을 안올렸습니다.</span>
            </li>
          </>
        )
      case `sold-계약검토`:
        return (
          <>
            <li>
              <div className="title">파일 다운로드</div>
              {data.buyerContractFile && (
                <a href={data.buyerContractFile} target="_blank" rel="noopener noreferrer">
                  계약서 다운로드
                </a>
              )}
            </li>
            <li>계약서를 확인 후 문제가 없다면 계좌번호를 입력해주세요.</li>
            <li>
              <div className="title">계좌번호 </div>
              <input
                type="text"
                placeholder="계좌를 입력해주세요."
                value={account}
                onChange={(e) => setAccount(e.target.value)}
              />
            </li>
          </>
        )
      case `buy-계약검토`:
        return (
          <>
            <li>
              <div className="title">파일 다운로드</div>
              {data.sellerContractFile && (
                <a href={data.sellerContractFile} target="_blank" rel="noopener noreferrer">
                  계약서 다운로드
                </a>
              )}
            </li>

            <li>
              <div className="title">계좌번호 </div>
              <span>판매자가 계좌번호를 등록하지 않았습니다. 기다려주세요.</span>
            </li>
          </>
        )

      case `buy-이체대기`:
        return (
          <>
            <li>
              <div className="title">파일 다운로드</div>
              {data.sellerContractFile && (
                <a href={data.sellerContractFile} target="_blank" rel="noopener noreferrer">
                  계약서 다운로드
                </a>
              )}
            </li>

            <li>
              <div>계좌 번호 : {data.accountNumber}</div>
              <span>좌측의 계좌번호에 송금 한 후에 완료 버튼을 눌러주세요.</span>
            </li>
          </>
        )
      case `sold-이체대기`:
        return (
          <>
            <li>
              <div className="title">파일 다운로드</div>
              {data.buyerContractFile && (
                <a href={data.buyerContractFile} target="_blank" rel="noopener noreferrer">
                  계약서 다운로드
                </a>
              )}
            </li>
            <li>판매자가 아직 송금하지 않았습니다. 잠시 기다려주세요.</li>
          </>
        )
      case `buy-이체검토`:
        return (
          <>
            <li>
              <div className="title">파일 다운로드</div>
              {data.sellerContractFile && (
                <a href={data.sellerContractFile} target="_blank" rel="noopener noreferrer">
                  계약서 다운로드
                </a>
              )}
            </li>
            <li>
              <div className="title">계좌번호 : {data.accountNumber} </div>
            </li>
            <li>아직 구매자가 송금확인을 안했습니다. 잠시 기다려주세요.</li>
          </>
        )
      case `sold-이체검토`:
        return (
          <>
            <li>
              <div className="title">파일 다운로드</div>
              {data.buyerContractFile && (
                <a href={data.buyerContractFile} target="_blank" rel="noopener noreferrer">
                  계약서 다운로드
                </a>
              )}
            </li>

            <li>입금이 확인되었다면 완료를 눌러주세요.</li>
          </>
        )
      case `buy-거래완료`:
        return (
          <>
            <li>
              <div className="title">파일 다운로드</div>
              {data.sellerContractFile && (
                <a href={data.sellerContractFile} target="_blank" rel="noopener noreferrer">
                  계약서 다운로드
                </a>
              )}
            </li>

            <li>
              <div className="title">계좌번호 : {data.accountNumber} </div>
            </li>

            <li>거래가 완료되었습니다.</li>
          </>
        )
      case `sold-거래완료`:
        return (
          <>
            <li>
              <div className="title">파일 다운로드</div>
              {data.buyerContractFile && (
                <a href={data.buyerContractFile} target="_blank" rel="noopener noreferrer">
                  계약서 다운로드
                </a>
              )}
            </li>

            <li>거래가 완료되었습니다.</li>
          </>
        )
      default:
        return (
          <>
            <li>
              <div className="title">파일 다운로드</div>
            </li>

            <li>
              <div className="title">파일업로드</div>
            </li>
            <li>
              <div className="title">계좌번호 </div>
            </li>
          </>
        )
    }
  }

  return (
    <S.FileContainer>
      {roll && data && statusUi(data.transactionStatus, roll)}

      <div className="btn-container">
        <button onClick={goBack}>리스트로 돌아가기</button>
        {data.transactionStatus !== '거래완료' && <button onClick={clickNextStep}>완료</button>}
      </div>
    </S.FileContainer>
  )
}

export default FileWrap
