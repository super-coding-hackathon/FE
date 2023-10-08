import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import { GetMyInfo, GetTotalBuyStatus, GetTotalSellStatus } from '../../../api/my/get'
import History from './History'
import MyList from './MyList'

const About = ({ setRendered, rendered }) => {
  const { data: userInfo } = useQuery(['userInfo'], GetMyInfo, {
    onSuccess: (response) => {
      // console.log(response)
    },
    onError: (response) => {
      // console.log(response)
    },
  })

  const { data: buyStatus } = useQuery(['buyStatus'], GetTotalBuyStatus, {
    onSuccess: (res) => {
      // console.log(res)
    },
  })

  const { data: sellStatus } = useQuery(['sellStatus'], GetTotalSellStatus, {
    onSuccess: (res) => {
      // console.log(res)
    },
  })

  const [saleHistory, setSaleHistory] = useState({
    title: '판매 현황',
    status: [
      { label: '거래 신청', number: 4 },
      {
        label: '거래 승인',
        number: 5,
      },
      {
        label: '계약 검토1',
        number: 7,
      },
      {
        label: '계약 검토2',
        number: 1,
      },
      {
        label: '이체 대기',
        number: 1,
      },
      {
        label: '이체 검토',
        number: 1,
      },
      {
        label: '거래 완료',
        number: 1,
      },
    ],
  })

  const [buyHistory, setBuyHistory] = useState({
    title: '구매 현황',
    // moreLink: '/',
    status: [
      { label: '거래 신청', number: 4 },
      {
        label: '거래 승인',
        number: 5,
      },
      {
        label: '계약 검토1',
        number: 7,
      },
      {
        label: '계약 검토2',
        number: 1,
      },
      {
        label: '이체 대기',
        number: 1,
      },
      {
        label: '이체 검토',
        number: 1,
      },
      {
        label: '거래 완료',
        number: 1,
      },
    ],
  })
  return (
    <>
      <div className="userInfo">
        <div className="info-item">
          <p>이메일</p>
          <div className="info">{userInfo?.email}</div>
        </div>
        <div className="info-item">
          <p>닉네임</p>
          <div className="info">{userInfo?.nickname}</div>
        </div>
        <div className="info-item">
          <p>전화번호</p>
          <div className="info">{userInfo?.phoneNumber}</div>
        </div>
      </div>

      <History data={sellStatus} setRendered={setRendered} rendered={rendered} title="판매 현황" />
      <History data={buyStatus} setRendered={setRendered} rendered={rendered} title="구매 현황" />
      <MyList setRendered={setRendered} />
    </>
  )
}

export default About
