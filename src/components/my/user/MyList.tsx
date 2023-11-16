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
  // const [page, setPage] = useState<number>(0)
  // const [size, setSize] = useState<number>(8)
  let page = 0
  let size = 8

  const { data: myList } = useQuery<MyHomeList>(['myList', page, size], () => GetMyRegister(page, size), {
    // onSuccess: (res) => {
    //   // console.log(res)
    // },
    // 개수 잘라야함
  })

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
      <ul className="home-list">
        {myList?.contents.length === 0 && <p>등록해주세요.</p>}
        {myList?.contents.map((el) => (
          <li className="home-item" key={el.homeId}>
            <img className="thumb" src={el.thumbnailUrl} alt="" />
            <div className="name">{el.homeName}</div>
          </li>
        ))}
        {myList && myList?.contents.length < 5 && <span onClick={directDetail}>더 보기</span>}
        {/* <li className="home-item">
          <img className="thumb" src="" alt="" />
          <div className="name">ㅊㅇ</div>
        </li>
        <li className="home-item">
          <img className="thumb" src="" alt="" />
          <div className="name">ㅊㅇ</div>
        </li>
        <li className="home-item">
          <img className="thumb" src="" alt="" />
          <div className="name">ㅊㅇ</div>
        </li>
        <li className="home-item">
          <img className="thumb" src="" alt="" />
          <div className="name">ㅊㅇ</div>
        </li>
        <li className="home-item">
          <img className="thumb" src="" alt="" />
          <div className="name">ㅊㅇ</div>
        </li> */}
      </ul>
    </S.History>
  )
}

export default MyList
