import { useQuery } from '@tanstack/react-query'
import { FC } from 'react'
import { GetMyInfo, GetTotalBuyStatus, GetTotalSellStatus } from '../../../api/my/get'
import History from './History'
import MyList from './MyList'
import { StatusType, TabProps } from '../type'

const About: FC<TabProps> = ({ setRendered, rendered }) => {
  const { data: userInfo } = useQuery(['userInfo'], GetMyInfo, {
    // onSuccess: (response) => {
    //   // console.log(response)
    // },
    // onError: (response) => {
    //   // console.log(response)
    // },
  })

  const { data: buyStatus } = useQuery<StatusType[]>(['buyStatus'], GetTotalBuyStatus, {
    // onSuccess: (res) => {
    //   console.log('buy :', res)
    // },
  })

  const { data: sellStatus } = useQuery<StatusType[]>(['sellStatus'], GetTotalSellStatus, {
    // onSuccess: (res) => {
    //   console.log('sell :', res)
    // },
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
