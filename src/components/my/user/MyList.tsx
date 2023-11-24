import { FC } from 'react'
import { AiOutlineRight } from 'react-icons/ai'
import * as S from '../../../pages/my/my.style'
import { useQuery } from '@tanstack/react-query'
import { GetMyRegister } from '../../../api/my/get'
import { MyHomeList } from '../type'

interface MyListProps {
  setRendered: (value: string) => void
}

const MyList: FC<MyListProps> = ({ setRendered }) => {
  let page = 0
  let size = 5

  const { data: myList } = useQuery<MyHomeList>(['myList', page, size], () => GetMyRegister(page, size), {})

  const directDetail = () => {
    setRendered('등록 현황')
  }

  return (
    <S.History>
      <div className="history-top">
        <h3>등록 현황</h3>
        <span onClick={directDetail}>
          자세히 보기 <AiOutlineRight />
        </span>
      </div>
      {myList && (
        <ul className="home-list">
          {myList && myList.contents.length === 0 && <p>등록해주세요.</p>}
          {myList.contents.map((el) => (
            <li className="home-item" key={el.homeId}>
              <img className="thumb" src={el.thumbnailUrl} alt="" />
              <div className="name">{el.homeName}</div>
            </li>
          ))}
          {myList && myList.contents.length < 5 && <span onClick={directDetail}>더 보기</span>}
        </ul>
      )}
    </S.History>
  )
}

export default MyList
