import { FC } from 'react'
import * as S from '../../pages/detail/detail.styls'
import { HomeDetailType } from './type'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { DeleteHome } from '../../api/home/delete'
import { useNavigate } from 'react-router-dom'

interface InfoTopProps {
  homeDetailInfo: HomeDetailType
}

const InfoTop: FC<InfoTopProps> = ({ homeDetailInfo }) => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const { mutate: deleteMutate } = useMutation(DeleteHome, {
    onSuccess: () => {
      queryClient.invalidateQueries(['myList'])
      console.log('삭제완료')
    },
  })

  const clickEdit = () => {
    // console.log('수정 누름')
    navigate(`/building/${homeDetailInfo.homeId}/edit`)
  }

  const clickDelete = () => {
    deleteMutate(homeDetailInfo.homeId)
    navigate(-1)
  }

  return (
    <S.InfoTop>
      <div className="name">{homeDetailInfo.name}</div>
      <div className="info-right">
        <div className="user-name">등록자 : {homeDetailInfo.seller}</div>
        <div className="create-at">등록 날짜 : {homeDetailInfo.createdAt}</div>
        {homeDetailInfo.isMine && (
          <>
            <button onClick={clickEdit}>수정</button>
            <button onClick={clickDelete}>삭제</button>
          </>
        )}
      </div>
    </S.InfoTop>
  )
}

export default InfoTop
