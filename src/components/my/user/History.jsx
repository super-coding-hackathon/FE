import React from 'react'
import * as S from '../../../pages/my/my.style'
import { AiOutlineRight } from 'react-icons/ai'

const History = ({ data, setRendered, rendered, title }) => {
  // console.log(rendered)
  const bgColorClass = title === '판매 현황' ? 'bg-green' : 'bg-white'

  const directDetail = (state) => {
    // console.log(state)
    setRendered(state)
  }

  const mapStatus = () => {
    return data?.map((el, index) => (
      <li className="history-tab" key={index}>
        <span className="history-tab_title">{el.statusName}</span>
        <span>{el.count}</span>
      </li>
    ))
  }
  return (
    <S.History>
      <div className="history-top">
        <h3>{title}</h3>
        <span onClick={() => directDetail(title)}>
          자세히 보기 <AiOutlineRight />
        </span>
      </div>
      <ul className={bgColorClass}>{mapStatus()}</ul>
    </S.History>
  )
}

export default History
