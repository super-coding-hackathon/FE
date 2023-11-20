import { useEffect, useState } from 'react'

import * as S from '../register/register.style'

import { useQuery } from '@tanstack/react-query'
import { HomeDetailType } from '../../components/detail/type'
import { GetHomeDetail } from '../../api/home/get'
import { useParams } from 'react-router-dom'
import EditStepOne from '../../components/detail/edit/EditStepOne'
import EditStepTwo from '../../components/detail/edit/EditStepTwo'
import { FormDataType } from '../../components/register/type'

const EditDetailPage = () => {
  const [step, setStep] = useState<number>(1)
  const [openPostCode, setOpenPostCode] = useState<boolean | undefined>(false)
  const id = Number(useParams().homeId)

  const { data: homeDetailInfo } = useQuery<HomeDetailType>(['homeDetailInfo'], () => GetHomeDetail(id), {})

  const [formData, setFormData] = useState<FormDataType>({
    address: '',
    detailAddress: '',
    categoryId: '',
    deposit: null,
    floor: null,
    imageFiles: [],
    isParking: false,
    latitude: null, //위도(소수점 6자리)
    longitude: null, //위도(소수점 6자리)
    maintenanceFee: null,
    mapId: '', // 카카오 map Id
    price: 200,
    name: '',
    roadAddress: '',
    squareFeet: null,
    thumbnailImage: null,
    transactionType: '',
  })

  useEffect(() => {
    if (homeDetailInfo) {
      const {
        address,
        categoryName,
        roadAddress,
        deposit,
        floor,
        isParking,
        detailAddress,
        maintenanceFee,
        price,
        name,
        squareFeet,
        transactionType,
      } = homeDetailInfo

      const imgList = homeDetailInfo.imageFiles.filter((el) => !el.isThumbnail)
      const thumnail = homeDetailInfo.imageFiles.filter((el) => el.isThumbnail)

      setFormData({
        ...formData,
        address,
        roadAddress,
        categoryId: categoryName,
        deposit,
        floor,
        isParking,
        maintenanceFee,
        price,
        name,
        squareFeet,
        transactionType,
        detailAddress,
        thumbnailImage: thumnail.map((img) => img.imageUrl),
        imageFiles: imgList.map((img) => img.imageUrl),
      })
    }
  }, [homeDetailInfo])

  console.log('formData :', formData)

  // 이벤트 핸들러 객체 생성
  const handle = {
    clickPost: () => {
      setOpenPostCode((prev) => !prev)
    },
    selectAddress: (data: { address: string; roadAddress: string }) => {
      console.log(data)
      setFormData({
        ...formData,
        address: data.address,
        roadAddress: data.roadAddress,
      })
      setOpenPostCode(false)
    },
    onChangeInput: (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target
      setFormData({
        ...formData,
        [name]: value,
      })
    },
    onChangeSelect: (e: { name: string; value: string }) => {
      const { name, value } = e
      setFormData({
        ...formData,
        [name]: value,
        // formData로 바꿀 때 number로 바꾸기(Category Id)
      })
    },
    onChangeNumber: (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target
      setFormData({
        ...formData,
        [name]: Number(value),
      })
    },
    onChangeCheck: (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, checked } = e.target
      setFormData({
        ...formData,
        [name]: checked,
      })
    },
  }

  const stepPage: { [key: number]: JSX.Element } = {
    1: (
      <EditStepOne
        handle={handle}
        formData={formData}
        setFormData={setFormData}
        step={step}
        setStep={setStep}
        openPostCode={openPostCode}
        setOpenPostCode={setOpenPostCode}
      />
    ),
    2: <EditStepTwo handle={handle} formData={formData} setFormData={setFormData} step={step} setStep={setStep} />,
  }

  return <S.RegisterWrap>{stepPage[step]}</S.RegisterWrap>
}

export default EditDetailPage
