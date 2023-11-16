import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { GetMyRegister } from '../../api/my/get'
import * as S from '../../pages/my/my.style'
import { useNavigate } from 'react-router-dom'
import { MyHomeType } from './type'

const MyHome = () => {
  const navigate = useNavigate()
  const [page, setPage] = useState<number>(0)
  let size = 6

  const { data: myList } = useQuery(['myList', page, size], () => GetMyRegister(page, size), {})

  const directDetail = (id: number) => {
    navigate(`/building/${id}`)
  }

  const clickPage = (pageNumber: number) => {
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

  const mapList = () => {
    if (myList?.contents.length === 0) {
      return <p className="none">등록된 건물이 없습니다.</p>
    } else {
      return myList?.contents.map((el: MyHomeType) => (
        <li key={el.homeId} onClick={() => directDetail(el.homeId)}>
          <div className="thumb">
            <img src={el.thumbnailUrl} alt="thumbnail" />
          </div>
          <div className="info">
            <div className="info-item">
              <p>주소</p>
              <span>{el.address}</span>
            </div>
            <div className="info-item">
              <p>건물 이름</p>
              <span>{el.homeName}</span>
            </div>
            <div className="info-item">
              <p>건물 종류</p>
              <span>{el.categoryName}</span>
            </div>
            <div className="info-item">
              <p>매매/전세</p>
              <span>{el.transactionType}</span>
            </div>
            <div className="info-item">
              <p>등록날짜</p>
              <span>{el.createdAt}</span>
            </div>
          </div>
        </li>
      ))
    }
  }

  return (
    <S.MyListWrap>
      <ul> {mapList()}</ul>
      <div className="pagination">{pageBtn(myList?.totalPages)}</div>
    </S.MyListWrap>
  )
}

export default MyHome
