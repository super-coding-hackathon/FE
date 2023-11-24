import { FC, useEffect, useState } from 'react'
import * as S from '../../pages/my/my.style'
import { AiFillQuestionCircle } from 'react-icons/ai'
import Modal from 'react-modal'

import { BuyerDetail, ReceiptProps, SellerDetail } from './type'
// import Accordion from './Accordion'
import { useNavigate } from 'react-router-dom'
// import Pagination from './Pagination'

const Receipt: FC<ReceiptProps<SellerDetail | BuyerDetail>> = ({ data, rendered, setPage }) => {
  const [openModal, setOpenModal] = useState<boolean>(false)
  const navigate = useNavigate()

  const [roll, setRoll] = useState<string>('')

  const clickToolTip = () => {
    setOpenModal(!openModal)
  }

  const clickPage = (pageNumber: number) => {
    console.log(pageNumber)
    setPage(pageNumber)
  }

  const pageBtn = (total: number) => {
    const pages = Array.from({ length: total }, (_, i) => i + 1)

    const pageElement = pages.map((number) => {
      return (
        <div className="page" onClick={() => clickPage(number - 1)}>
          {number}
        </div>
      )
    })
    return pageElement
  }

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

  const clickDetail = (id: number, roll: string) => {
    navigate(`/${roll}/${id}/detail`)
  }

  const renderItemList = () => {
    return data?.contents.map((el, index) => (
      <>
        <li className="item" key={index} onClick={() => clickDetail(el.transactionId, roll)}>
          <div className="item_desc imgBox">
            {rendered === '구매 현황' && el.sellerContractFile && (
              <a href={el.sellerContractFile} target="_blank" rel="noopener noreferrer" />
            )}
            <img className="item_desc" src={el.thumbnailUrl} alt="상품" />
          </div>
          <div className="item_desc">{el.homeName}</div>
          <div className="item_desc">{el.deposit}만원</div>
          <div className="item_desc">{el.address}</div>
          <div className="item_desc">
            {rendered === '판매 현황' ? (el as SellerDetail).buyer : (el as BuyerDetail).seller}
          </div>
          <div className="item_desc">{el.transactionStatus}</div>
        </li>
      </>
    ))
  }

  useEffect(() => {
    if (rendered === '판매 현황') {
      setRoll('sold')
    } else {
      setRoll('buy')
    }
  }, [])

  return (
    <S.PurchaseContainer>
      <h2>{rendered}</h2>
      <div className="total">
        총 <span>{data?.totalElements}</span>개
      </div>
      <S.Table>
        <li className="table-title">
          <div className="table-title_item">건물 </div>
          <div className="table-title_item">건물 명</div>
          <div className="table-title_item">계약금</div>
          <div className="table-title_item">주소</div>
          <div className="table-title_item">{rendered === '판매 현황' ? '구매자' : '판매자'}</div>
          <div className="table-title_item">
            거래 상태 <AiFillQuestionCircle onClick={clickToolTip} />
          </div>
        </li>

        {data?.contents.length === 0 && <p className="none">상품이 없습니다.</p>}
        {renderItemList()}

        <div className="pagination">{pageBtn(data.totalPages)}</div>
      </S.Table>

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
            <span style={titleStyles}>거래 승인</span> : 판매자가 거래신청 중 하나를 골라 계약서를 작성해 첨부한 상태
          </li>
          <li style={tooltipItemStyles}>
            <span style={titleStyles}>계약 검토1</span> : 구매자가 판매자가 첨부한 계약서를 받아 추가 작성 및 검토 후
            첨부 및 거래 취소
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
    </S.PurchaseContainer>
  )
}

export default Receipt
