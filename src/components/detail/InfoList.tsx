import { FC } from 'react'
import * as S from '../../pages/detail/detail.styls'
import InfoItem from './InfoItem'
import { HomeDetailType } from './type'

interface InfoListProps {
  homeDetailInfo: HomeDetailType
}

const InfoList: FC<InfoListProps> = ({ homeDetailInfo }) => {
  return (
    <div>
      <S.InfoBox>
        <InfoItem title="주소" desc={homeDetailInfo.address} />

        <InfoItem title="상세 주소" desc={homeDetailInfo.detailAddress} />
      </S.InfoBox>

      <S.InfoBox>
        <InfoItem title="도로명 주소" desc={homeDetailInfo.roadAddress} />

        <InfoItem title="건물 종류" desc={homeDetailInfo.categoryName} />
      </S.InfoBox>

      <S.InfoBox>
        <InfoItem title="전세/매매" desc={homeDetailInfo.transactionType} />

        <InfoItem title="가격" desc={homeDetailInfo.price} />
      </S.InfoBox>
      <S.InfoBox>
        <InfoItem title="관리비" desc={homeDetailInfo.maintenanceFee} />

        <InfoItem title="보증금" desc={homeDetailInfo.deposit} />
      </S.InfoBox>
      <S.InfoBox>
        <InfoItem title="크기" desc={homeDetailInfo.squareFeet} />

        <InfoItem title="층 수" desc={homeDetailInfo.floor} />
      </S.InfoBox>
    </div>
  )
}

export default InfoList
