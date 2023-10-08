import React, { useState } from 'react'
import * as S from '../../pages/my/my.style'
import { useNavigate } from 'react-router-dom'
import { AiOutlineCheck } from 'react-icons/ai'
import File from './File'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { PostNextStep } from '../../api/transaction/post'

const Accordion = ({ data, roll, id }) => {
  const queryClient = useQueryClient()
  // console.log(data)
  // console.log(id)
  console.log(roll)
  const navigate = useNavigate()

  const [account, setAccount] = useState('')

  const step = [
    { label: '거래신청' },
    { label: '거래승인' },
    { label: '계약검토' },
    { label: '이체대기' },
    { label: '이체검토' },
    { label: '거래완료' },
  ]

  const directDetail = (id) => {
    navigate(`/bulding/${id}`)
  }

  const { mutate: transactionMutate } = useMutation(PostNextStep, {
    onSuccess: (res) => {
      console.log(res)
      queryClient.invalidateQueries(['soldInfo'])
      queryClient.invalidateQueries(['boughtInfo'])
    },
  })

  const clickPayMoney = () => {
    const formData = new FormData()
    const data = {
      accountNumber: account,
    }

    formData.append('nextStepRequest', new Blob([JSON.stringify(data)], { type: 'application/json' }))

    let obj = {
      id,
      formData,
    }
    transactionMutate(obj)
  }

  return (
    <S.AccordionBody>
      <div className="step">프로세스</div>
      {step.map((el, index) => (
        <div
          className="step-flex"
          key={index}
          // onClick={() => handleStepClick(index)}
        >
          <p
            key={index}
            className={index < step.findIndex((item) => item.label === data.transactionStatus) ? 'completed' : ''}
          >
            {el.label}
          </p>
          {index < step.findIndex((item) => item.label === data.transactionStatus) ? (
            <div className="agree">
              <AiOutlineCheck />
            </div>
          ) : (
            <div className="confirm"></div>
          )}
        </div>
      ))}

      {roll === '판매자' && data.transactionStatus === '거래신청' && (
        <File
          transactionMutate={transactionMutate}
          id={data.transactionId}
          roll="판매자"
          status={data.transactionStatus}
        />
      )}

      {roll === '구매자' && data.transactionStatus === '거래승인' && (
        <File
          transactionMutate={transactionMutate}
          id={data.transactionId}
          roll="구매자"
          status={data.transactionStatus}
        />
      )}

      {roll === '판매자' && data.transactionStatus === '계약검토' && (
        <>
          <a href={data.buyerContractFile} target="_blank" rel="noopener noreferrer">
            계약서 다운로드
          </a>
          <input type="text" value={account} onChange={(e) => setAccount(e.target.value)} />

          <button onClick={clickPayMoney}>계좌번호 보내기</button>
        </>
      )}

      {roll === '구매자' && data.transactionStatus === '거래승인' && (
        <>
          <a href={data.sellerContractFile} target="_blank" rel="noopener noreferrer">
            계약서 다운로드
          </a>

          <button onClick={clickPayMoney}>계약서 첨부 완료</button>
        </>
      )}

      {roll === '구매자' && data.transactionStatus === '이체대기' && (
        <>
          <div>계좌 번호 : {data?.accountNumber}</div>
          <button onClick={clickPayMoney}>송금하기</button>
        </>
      )}

      {roll === '판매자' && data.transactionStatus === '이체검토' && <button onClick={clickPayMoney}>확인완료</button>}
    </S.AccordionBody>
  )
}

export default Accordion
