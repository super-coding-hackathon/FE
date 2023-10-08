import React, { useRef, useState } from 'react'
import * as S from './detail.styls'
import useMapByAddress from './../../hooks/useMapByAddress'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { GetHomeDetail } from '../../api/home/get'
import { useNavigate, useParams } from 'react-router-dom'
import { CreateTransaction } from '../../api/transaction/post'

const DetailPage = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const mapRef = useRef(null)
  const id = Number(useParams().homeId)
  // console.log(id)
  const { chageAddress, mapData } = useMapByAddress(mapRef)

  const [thumbnail, setThumbnail] = useState([])
  const [imgList, setImgList] = useState([])

  const { data: homeDetailInfo } = useQuery(['homeDetailInfo'], () => GetHomeDetail(id), {
    onSuccess: (res) => {
      console.log(res)
      setThumbnail(res.imageFiles.filter((el) => el.isThumbnail))
      setImgList(res.imageFiles.filter((el) => !el.isThumbnail))?.map((el) => el)
      chageAddress(res.address)
    },
  })

  const { mutate: transactionMutate } = useMutation(CreateTransaction, {
    onSuccess: (res) => {
      console.log(res)
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
      <div className="info-top">
        <div className="name">{homeDetailInfo?.name}</div>
        <div className="info-right">
          <div className="user-name">등록자 : {homeDetailInfo?.seller}</div>
          <div className="create-at">등록 날짜 : {homeDetailInfo?.createdAt.split(' ')[0]}</div>
        </div>
      </div>
      <div className="info-box">
        <div className="info-item">
          <p>주소 : </p>
          <span>{homeDetailInfo?.address}</span>
        </div>

        <div className="info-item">
          <p>상세 주소 : </p>
          <span>{homeDetailInfo?.detailAddress}</span>
        </div>
      </div>
      <div className="info-box">
        <div className="info-item">
          <p>도로명 주소 : </p>
          <span>{homeDetailInfo?.roadAddress}</span>
        </div>

        <div className="info-item">
          <p>건물 종류 : </p>
          <span>이거 안됨</span>
        </div>
      </div>
      <div className="info-box">
        <div className="info-item">
          <p>전세/매매 : </p>
          <span>{homeDetailInfo?.transactionType}</span>
        </div>

        <div className="info-item">
          <p>가격 : </p>
          <span>{homeDetailInfo?.price}만원</span>
        </div>
      </div>
      <div className="info-box">
        <div className="info-item">
          <p>관리비 : </p>
          <span>{homeDetailInfo?.maintenanceFee}만원</span>
        </div>

        <div className="info-item">
          <p>보증금 : </p>
          <span>{homeDetailInfo?.deposit}만원</span>
        </div>
      </div>
      <div className="info-box">
        <div className="info-item">
          <p>크기 : </p>
          <span>{homeDetailInfo?.floor}평</span>
        </div>

        <div className="info-item">
          <p>층 수 : </p>
          <span>{homeDetailInfo?.floor}층</span>
        </div>
      </div>

      <div className="info-box">
        <div className="info-item">
          <p>주차 : </p>
          <span>{homeDetailInfo?.isParking === true ? '가능' : '불가'}</span>
        </div>

        <p className="post" onClick={startTransaction}>
          거래 요청하기
        </p>
      </div>

      <div className="title">건물 사진</div>
      <div className="img-container">
        <div className="thumb">
          {thumbnail?.map((el, index) => (
            <img src={el.imageUrl} key={index} alt="썸네일" />
          ))}
        </div>
        <div className="img-list">
          {imgList?.map((el, index) => (
            <img src={el.imageUrl} key={index} alt={`사진 ${index}`} />
          ))}
        </div>
      </div>

      <div className="title">지도</div>
      <div className="map" ref={mapRef}></div>
    </S.DetailWrap>
  )
}

export default DetailPage
