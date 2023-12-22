import { useEffect, useState } from 'react'
import ProgressBar from '../../components/transaction/ProgressBar'
import * as S from './transactionDetail.style'
import { useQuery } from '@tanstack/react-query'

import { useParams } from 'react-router-dom'
import TransactionInfo from '../../components/transaction/TransactionInfo'
import { TransactionDetail } from '../../components/my/type'
import Modal from 'react-modal'
import { FaQuestion } from 'react-icons/fa'
import StepList from '../../components/transaction/StepList'
import FileWrap from '../../components/transaction/FileWrap'
import { GetBuyDetail, GetSellDetail } from '../../api/transaction/get'
import ChatRoom from '../../components/chatroom/ChatRoom'
// import ChatList from '../../components/chatroom/ChatList'

const StepDetail = () => {
  const [step, setStep] = useState<number>(1)

  const id = Number(useParams().transactionId)
  const roll = useParams().roll
  const [detailData, setDetailData] = useState<TransactionDetail | null>(null)

  const { data: buyData } = useQuery<TransactionDetail>(['buyDetail', id], () => GetBuyDetail(id), {
    enabled: roll === 'buy',
  })

  const { data: sellData } = useQuery<TransactionDetail>(['sellDetail', id], () => GetSellDetail(id), {
    enabled: roll === 'sold',
  })

  useEffect(() => {
    if (roll === 'buy' && buyData) {
      setDetailData(buyData)
      setStep(buyData.transactionStatusId)
    } else if (roll === 'sold' && sellData) {
      setDetailData(sellData)
      setStep(sellData.transactionStatusId)
    }
  }, [buyData, sellData])

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       if (roll === 'buy') {
  //         const response = await GetBuyDetail(id)
  //         // console.log('구매현황', response)
  //         setDetailData(response)
  //         setStep(response.transactionStatusId)
  //       } else if (roll === 'sold') {
  //         const response = await GetSellDetail(id)
  //         // console.log('판매현황', response)
  //         setDetailData(response)
  //         setStep(response.transactionStatusId)
  //       }
  //     } catch (error) {
  //       // console.error('Error fetching transaction detail:', error)
  //     }
  //   }

  //   fetchData()
  // }, [id, roll])

  const [openModal, setOpenModal] = useState<boolean>(false)

  const customStyles: ReactModal.Styles = {
    overlay: {
      backgroundColor: 'rgba(0,0,0,0.5)',
      position: 'absolute',
      zIndex: '2',
    },
    content: {
      left: '40px',
      margin: 'auto',
      width: '750px',
      height: '400px',
      padding: '10px',
      boxSizing: 'border-box',
      overflow: 'hidden',
      borderRadius: '12px',
    },
  }

  const tooltipBoxStyles: React.CSSProperties = {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  }
  const tooltipItemStyles = {
    fontSize: '16px',
    marginTop: '10px',
  }
  const titleStyles = {
    fontSize: '20px',
    fontWeight: '800',
  }

  const clickToolTip = () => {
    setOpenModal(!openModal)
  }

  return (
    <>
      {detailData && (
        <S.StepDetailWrap>
          <h2>거래 상세</h2>

          <ProgressBar step={step} />

          <div className="meta">
            <div className="tip" onClick={clickToolTip}>
              <span>거래상태란</span>
              <FaQuestion />
            </div>
            <div className="step">
              <span>{step}</span>/6
            </div>
          </div>

          <p className="now-status">
            현재 상태 : <span>{detailData.transactionStatus}</span>
          </p>

          <TransactionInfo data={detailData} roll={roll} />
          <div className="line" />
          <StepList data={detailData} />

          <FileWrap data={detailData} roll={roll} />

          <ChatRoom />

          <Modal
            isOpen={openModal}
            ariaHideApp={false}
            style={customStyles}
            onRequestClose={() => setOpenModal(false)}
            shouldCloseOnOverlayClick={true}
          >
            <ul className="tooltip-box" style={tooltipBoxStyles}>
              <li style={tooltipItemStyles}>
                <span style={titleStyles}>거래 신청</span> : 구매자가 집을 골라서 거래신청을 한 상태
              </li>
              <li style={tooltipItemStyles}>
                <span style={titleStyles}>거래 승인</span> : 판매자가 거래신청 중 하나를 골라 계약서를 작성해 첨부한
                상태
              </li>
              <li style={tooltipItemStyles}>
                <span style={titleStyles}>계약 검토1</span> : 구매자가 판매자가 첨부한 계약서를 받아 추가 작성 및 검토
                후 첨부 및 거래 취소
              </li>
              <li style={tooltipItemStyles}>
                <span style={titleStyles}>계약 검토2</span> : 판매자가 구매자가 첨부한 계약서를 받아 계약금 요청 및 거래
                취소
              </li>
              <li style={tooltipItemStyles}>
                <span style={titleStyles}>이체 대기</span> : 구매자가 계약금 요청을 받은 상태
              </li>
              <li style={tooltipItemStyles}>
                <span style={titleStyles}>이체 검토</span> : 판매자가 이체내역을 확인하는 단계
              </li>
              <li style={tooltipItemStyles}>
                <span style={titleStyles}>거래 완료</span> : 이체 내역 확인
              </li>
            </ul>
          </Modal>
        </S.StepDetailWrap>
      )}
    </>
  )
}

export default StepDetail
