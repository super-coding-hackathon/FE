import React, { FC } from 'react'
import * as S from '../../pages/my/my.style'
import { TabProps } from './type'

const Tab: FC<TabProps> = ({ setRendered, rendered }) => {
  const tabs = [{ label: '회원 정보' }, { label: '구매 현황' }, { label: '판매 현황' }, { label: '등록 현황' }]

  const clickTab = (e: React.MouseEvent<HTMLDivElement>) => {
    setRendered(e.currentTarget.innerHTML)
  }

  const mapTabList = () => {
    return tabs.map((el, index) => (
      <div className={el.label === rendered ? 'active' : 'tab-item'} key={index} onClick={clickTab}>
        {el.label}
      </div>
    ))
  }
  return (
    <S.TabSection>
      <div className="tab">{mapTabList()}</div>
    </S.TabSection>
  )
}

export default Tab
