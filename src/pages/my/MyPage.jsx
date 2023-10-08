import React, { useState } from 'react'
import * as S from './my.style'
import About from '../../components/my/user/About'
import Buyer from '../../components/my/Buyer'
import Seller from '../../components/my/Seller'
import Tab from '../../components/my/Tab'
import MyHome from '../../components/my/MyHome'
import Receipt from '../../components/my/Receipt'

const MyPage = () => {
  const [rendered, setRendered] = useState('회원 정보')
  // console.log(rendered)

  const render = {
    '회원 정보': <About setRendered={setRendered} rendered={rendered} />,
    '구매 현황': <Buyer rendered={rendered} />,
    '판매 현황': <Seller rendered={rendered} />,
    '등록 현황': <MyHome />,
  }

  return (
    <S.MyPageWrap>
      <div className="title">마이페이지</div>
      <div className="flex-box">
        <Tab setRendered={setRendered} rendered={rendered} />
        <S.RenderSection>{render[rendered]}</S.RenderSection>
      </div>
    </S.MyPageWrap>
  )
}

export default MyPage
