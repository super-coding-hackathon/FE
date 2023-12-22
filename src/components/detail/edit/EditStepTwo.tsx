import { ChangeEvent, FC, useRef, useState } from 'react'

import { useNavigate, useParams } from 'react-router-dom'
import { InvalidateErrors, StepProps } from '../../register/type'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { PutHome } from '../../../api/home/put'

const EditStepTwo: FC<StepProps> = ({ handle, formData, step, setStep, setFormData }) => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const id = useParams().homeId

  const [errors, setErrors] = useState<InvalidateErrors>({})
  const [imgList, setImgList] = useState<string[]>([])
  const [thumnail, setThumbnail] = useState<string | null>(null)
  // console.log('thumnail :', thumnail)
  // console.log('imgList :', imgList)
  // console.log(formData)

  const imageRef = useRef<HTMLInputElement | null>(null)

  const onClickImageUpload = () => {
    if (imageRef.current) {
      imageRef.current.click()
    }
  }

  const handleImagesChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files)

      if (files.length > 5) {
        alert('사진은 최대 5개입니다.')
        return
      } else {
        const newImages: File[] = [...files]
        setFormData({
          ...formData,
          thumbnailImage: newImages[0],
          imageFiles: newImages.length > 1 ? newImages.slice(1) : [],
        })

        setThumbnail(URL.createObjectURL(newImages[0]))
        setImgList(newImages.slice(1).map((image) => URL.createObjectURL(image)))
      }
    }
  }

  const validate = () => {
    let errors: InvalidateErrors = {}

    if (step === 2 && formData.squareFeet === null) {
      errors.squareFeet = '평수는 1이상으로 입력해주세요.'
    }
    if (step === 2 && formData.floor === null) {
      errors.floor = '층수는 1이상으로 입력해주세요.'
    }
    if (step === 2 && formData.maintenanceFee === null) {
      errors.maintenanceFee = '관리비는 1이상으로 입력해주세요.'
    }

    return errors
  }

  // 썸네일
  const thumnailLayout = () => {
    if (thumnail) {
      return <img src={thumnail} alt="thumnail" />
    } else if (formData.thumbnailImage && Array.isArray(formData.thumbnailImage)) {
      const thumb = formData.thumbnailImage[0]
      return <img src={thumb} alt="thumnail" />
    }
  }

  // 이미지 리스트
  const imgListLayout = () => {
    if (imgList.length > 0) {
      return imgList.map((image, index) => (
        <div key={index} className="sub-img">
          <img src={image} alt={`이미지 ${index + 1}`} />
        </div>
      ))
    } else if (formData.imageFiles) {
      return formData.imageFiles.map((image, index) => {
        let imageUrl
        if (typeof image === 'string') {
          imageUrl = image
        } else if (image instanceof File) {
          imageUrl = URL.createObjectURL(image)
        }

        return (
          <div key={index} className="sub-img">
            <img src={imageUrl} alt={`이미지 ${index + 1}`} />
          </div>
        )
      })
    }
  }

  const { mutate: putHomeDetail } = useMutation(PutHome, {
    onSuccess: () => {
      console.log('성공')
      queryClient.invalidateQueries(['myList'])
      queryClient.invalidateQueries(['homeDetailInfo'])
      navigate('/mypage')
    },
    onError: (response) => console.log(response),
  })

  const clickButton = (state: 'prev' | 'next') => {
    if (state === 'next') {
      const errors = validate()
      if (Object.keys(errors).length === 0) {
        const formDataToSend = new FormData()

        formDataToSend.append(
          'categoryId',
          String(formData.categoryId === '아파트' ? 1 : formData.categoryId === '빌라' ? 2 : 3),
        )
        formDataToSend.append('address', formData.address)
        formDataToSend.append('detailAddress', formData.detailAddress)
        formDataToSend.append('deposit', String(formData.deposit))
        formDataToSend.append('floor', String(formData.floor))
        formDataToSend.append('name', formData.name)
        formDataToSend.append('isParking', String(formData.isParking))
        formDataToSend.append('latitude', String(formData.latitude))
        formDataToSend.append('longitude', String(formData.longitude))
        formDataToSend.append('maintenanceFee', String(formData.maintenanceFee))
        formDataToSend.append('mapId', String(formData.mapId))
        formDataToSend.append('price', String(formData.price))
        formDataToSend.append('roadAddress', formData.roadAddress)
        formDataToSend.append('squareFeet', String(formData.squareFeet))

        formDataToSend.append('transactionType', formData.transactionType)

        if (imgList && imgList.length > 0 && formData.imageFiles) {
          formData.imageFiles.forEach((imageFile) => {
            formDataToSend.append(`imageFiles`, imageFile)
          })
        }

        if (thumnail && thumnail !== '') {
          console.log('ddd')
          if (typeof formData.thumbnailImage === 'string') {
            formDataToSend.append('thumbnailImage', formData.thumbnailImage)
          } else if (formData.thumbnailImage instanceof File) {
            formDataToSend.append('thumbnailImage', formData.thumbnailImage)
          }
        }

        if (id) {
          putHomeDetail({ id, formDataToSend })
        }
        setStep(1)
      } else {
        setErrors(errors)
      }
    } else {
      setStep(step - 1)
    }
  }

  return (
    <>
      <div className="flex-container">
        <div className="value-box-side">
          <label htmlFor="squareFeet">크기</label>
          <div className="price">
            <input
              id="squareFeet"
              type="number"
              min="1"
              max="99999999"
              name="squareFeet"
              value={formData.squareFeet || ''}
              onChange={handle.onChangeNumber}
            />
            <span>평</span>
          </div>
          {errors.squareFeet && <div className="valid">{errors.squareFeet}</div>}
        </div>

        <div className="value-box-side">
          <label htmlFor="floor">층 수</label>
          <div className="price">
            <input
              id="floor"
              type="number"
              min="1"
              max="99999999"
              name="floor"
              value={formData.floor || ''}
              onChange={handle.onChangeNumber}
            />
            <span>층</span>
          </div>
          {errors.floor && <div className="valid">{errors.floor}</div>}
        </div>

        <div className="value-box-side">
          <label htmlFor="maintenanceFee">관리비</label>
          <div className="price">
            <input
              id="maintenanceFee"
              type="number"
              min="1"
              max="99999999"
              value={formData.maintenanceFee?.toString()}
              name="maintenanceFee"
              onChange={handle.onChangeNumber}
            />
            <span>만원</span>
          </div>
          {errors.maintenanceFee && <div className="valid">{errors.maintenanceFee}</div>}
        </div>
      </div>

      <div className="value-box-flex">
        <label htmlFor="isParking">주차</label>
        <input type="checkbox" name="isParking" checked={formData.isParking} onChange={handle.onChangeCheck} />
      </div>

      <div className="value-img-container">
        <div className="top">
          <label htmlFor="image">사진</label>
          <button onClick={onClickImageUpload}>이미지 수정</button>
        </div>
        <input
          type="file"
          multiple
          id="image"
          ref={imageRef}
          style={{ display: 'none' }}
          onChange={handleImagesChange}
        />
        <div className="img-layout">
          <div className="thumnail">{thumnailLayout()}</div>
          <div className="img-list">{imgListLayout()}</div>
        </div>
        <p>여러 사진을 한번에 최대 5장 업로드 할 수 있으며, 첫번째 사진은 썸네일로 사용됩니다.</p>
      </div>

      <div className="footer">
        <button onClick={() => clickButton('prev')}>뒤로</button>
        <span>{step} / 2 Page</span>
        <button onClick={() => clickButton('next')}>등록</button>
      </div>
    </>
  )
}

export default EditStepTwo
