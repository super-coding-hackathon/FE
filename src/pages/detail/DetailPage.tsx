import { useRef, useState } from 'react'
import * as S from './detail.styls'
import useMapByAddress from '../../hooks/useMapByAddress'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { GetHomeDetail } from '../../api/home/get'
import { useNavigate, useParams } from 'react-router-dom'
import { CreateTransaction } from '../../api/transaction/post'
import { HomeDetailType, imgFilesType } from '../../components/detail/type'
import InfoItem from './../../components/detail/InfoItem'
import InfoTop from '../../components/detail/InfoTop'
import InfoList from '../../components/detail/InfoList'
import Thumbnail from '../../components/detail/Thumbnail'
import ImgList from '../../components/detail/ImgList'

const DetailPage = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const mapRef = useRef(null)
  const id = Number(useParams().homeId)
  const { chageAddress } = useMapByAddress(mapRef)

  const [thumbnail, setThumbnail] = useState<imgFilesType[]>([])
  const [imgList, setImgList] = useState<imgFilesType[]>([])

  const { data: homeDetailInfo } = useQuery<HomeDetailType>(['homeDetailInfo'], () => GetHomeDetail(id), {
    onSuccess: (res) => {
      // console.log(res)
      setThumbnail(res.imageFiles.filter((el) => el.isThumbnail))
      setImgList(res.imageFiles.filter((el) => !el.isThumbnail))
      chageAddress(res.address)
    },
  })

  const { mutate: transactionMutate } = useMutation(CreateTransaction, {
    onSuccess: () => {
      queryClient.invalidateQueries(['buyStatus'])
      queryClient.invalidateQueries(['sellStatus'])
    },
  })

  const startTransaction = () => {
    transactionMutate(id)
    navigate('/mypage')
  }

  return (
    <S.DetailWrap>
      {homeDetailInfo && (
        <>
          <InfoTop homeDetailInfo={homeDetailInfo} />
          <InfoList homeDetailInfo={homeDetailInfo} />

          <S.InfoBox>
            <InfoItem title="주차" desc={homeDetailInfo.isParking === true ? '가능' : '불가'} />

            <p className="post" onClick={startTransaction}>
              거래 요청하기
            </p>
          </S.InfoBox>

          <div className="title">건물 사진</div>
          <div className="img-container">
            <Thumbnail thumbnail={thumbnail} />
            <ImgList imgList={imgList} />
          </div>

          <div className="title">지도</div>
          <div className="map" ref={mapRef}></div>
        </>
      )}
    </S.DetailWrap>
  )
}

export default DetailPage
