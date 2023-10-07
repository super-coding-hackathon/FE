import React, { useState } from 'react'

import * as S from './register.style'

import StepTwo from '../../components/register/StepTwo'
import StepOne from '../../components/register/StepOne'

const RegisterPage = () => {
  const [step, setStep] = useState(1)
  const [openPostCode, setOpenPostCode] = useState(false)

  const [formData, setFormData] = useState({
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
    price: null,
    name: '',
    roadAddress: '',
    squareFeet: null,
    thumbnailImage: '',
    transactionType: '',
  })

  console.log('formData :', formData)

  // 이벤트 핸들러 객체 생성
  const handle = {
    clickPost: () => {
      setOpenPostCode((prev) => !prev)
    },
    selectAddress: (data) => {
      console.log(data)
      setFormData({
        ...formData,
        address: data.address,
        roadAddress: data.roadAddress,
      })
      setOpenPostCode(false)
    },
    onChangeInput: (e) => {
      const { name, value } = e.target
      setFormData({
        ...formData,
        [name]: value,
      })
    },
    onChangeSelect: (e) => {
      const { name, value } = e
      setFormData({
        ...formData,
        [name]: value,
        // formData로 바꿀 때 number로 바꾸기(Category Id)
      })
    },
    onChangeNumber: (e) => {
      const { name, value } = e.target
      setFormData({
        ...formData,
        [name]: Number(value),
      })
    },
    onChangeCheck: (e) => {
      const { name, checked } = e.target
      setFormData({
        ...formData,
        [name]: checked,
      })
    },
  }

  const stepPage = {
    1: (
      <StepOne
        handle={handle}
        formData={formData}
        setFormData={setFormData}
        step={step}
        setStep={setStep}
        openPostCode={openPostCode}
        setOpenPostCode={setOpenPostCode}
      />
    ),
    2: (
      <StepTwo
        handle={handle}
        formData={formData}
        setFormData={setFormData}
        step={step}
        setStep={setStep}
        openPostCode={openPostCode}
        setOpenPostCode={setOpenPostCode}
      />
    ),
  }

  return <S.RegisterWrap>{stepPage[step]}</S.RegisterWrap>
}

export default RegisterPage
