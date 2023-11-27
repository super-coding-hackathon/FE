import { useState } from 'react'

import * as S from './register.style'

import StepOne from '../../components/register/StepOne'
import { FormDataType } from '../../components/register/type'
import StepTwo from '../../components/register/StepTwo'

const RegisterPage = () => {
  const [step, setStep] = useState<number>(1)
  const [openPostCode, setOpenPostCode] = useState<boolean | undefined>(false)

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
    2: <StepTwo handle={handle} formData={formData} setFormData={setFormData} step={step} setStep={setStep} />,
  }

  return <S.RegisterWrap>{stepPage[step]}</S.RegisterWrap>
}

export default RegisterPage
