import React, { useState } from 'react'
import * as S from '../../pages/my/my.style'
import { AiFillQuestionCircle } from 'react-icons/ai'
import Modal from 'react-modal'
import { useNavigate } from 'react-router-dom'
import Accordion from './Accordion'

const Receipt = ({ data, rendered, page, prevPage, nextPage }) => {
  // console.log('현재 state는 :', rendered, '입니다.')
  // console.log(data)
  // console.log(page)
  const navigate = useNavigate()
  const [openModal, setOpenModal] = useState(false)

  const [selectedItemIndex, setSelectedItemIndex] = useState(null)

  const clickToolTip = () => {
    setOpenModal((prev) => !prev)
  }

  const customStyles = {
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
      boxSizing: 'borderBox',
      overflow: 'hidden',
      borderRadius: '12px',
    },
  }

  const tooltipBoxStyles = {
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

  const clickAccordion = (index) => {
    setSelectedItemIndex(selectedItemIndex === index ? null : index)
  }

  const renderItemList = () => {
    if (rendered === '판매 현황') {
      return data?.contents.map((el, index) => (
        <>
          <li className="item" key={el.homeId} onClick={() => clickAccordion(index)}>
            <div className="item_desc imgBox">
              {/* buyerContractFile */}
              <img className="item_desc" src={el.thumbnailUrl} alt="상품" />
            </div>
            <div className="item_desc">{el.homeName}</div>
            <div className="item_desc">{el.deposit}만원</div>
            <div className="item_desc">{el.address}</div>
            <div className="item_desc">{el.buyer}</div>
            <div className="item_desc">{el.transactionStatus}</div>
          </li>
          {/* {openAccordion && <Accordion />} */}
          {selectedItemIndex === index && <Accordion key={index} data={el} id={el.transactionId} roll="판매자" />}
        </>
      ))
    } else {
      return data?.contents.map((el, index) => (
        // <li className="item" key={el.homeId} onClick={() => directDetail(el.homeId)}>
        <>
          <li className="item" key={el.homeId} onClick={() => clickAccordion(index)}>
            <div className="item_desc imgBox">
              {el.sellerContractFile && <a href={el.sellerContractFile} target="_blank" rel="noopener noreferrer" />}

              <img className="item_desc" src={el.thumbnailUrl} alt="상품" />
            </div>
            <div className="item_desc">{el.homeName}</div>
            <div className="item_desc">{el.deposit}만원</div>
            <div className="item_desc">{el.address}</div>
            <div className="item_desc">{el.seller}</div>
            <div className="item_desc">{el.transactionStatus}</div>
          </li>
          {/* {openAccordion && <Accordion />} */}
          {selectedItemIndex === index && <Accordion key={index} data={el} id={el.transactionId} roll="구매자" />}
        </>
      ))
    }
  }
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
          <div className="table-title_item">{rendered === '판매 현황' ? '판매자' : '구매자'}</div>
          <div className="table-title_item">
            거래 상태 <AiFillQuestionCircle onClick={clickToolTip} />
          </div>
        </li>

        {data?.contents.length === 0 && <p className="none">상품이 없습니다.</p>}
        {renderItemList()}

        <div className="pagination">
          {data?.hasPrevious && (
            <div className="page" onClick={prevPage}>
              {page}
            </div>
          )}
          <div className="page">{page + 1}</div>
          {data?.hasNext && (
            // <>
            //   <div className="page">{page + 2}</div>
            //   ...
            //   <div className="page"> {data?.totalPages}</div>
            // </>
            <div className="page" onClick={nextPage}>
              {page + 2}
            </div>
          )}
        </div>
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
