import { Form, Button } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import api from '../../api/axiosInstance'
import ToastAlarm from '../../components/ToastAlarm'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as S from './auth.style'
import { isAxiosError } from 'axios'

type FormData = {
  email: string
  nickname: string
  password: string
  passwordCheck: string
  phoneNumber: string
}

const requestSignUp = async (formData: FormData) => {
  const response = await api.post('/api/user/signup', formData)

  return response
}

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>({ mode: 'onChange' })
  const [showToast, setShowToast] = useState(false)
  const [toastMsg, setToastMsg] = useState('')
  const [variant, setVariant] = useState('danger')

  const navigate = useNavigate()

  const onClose = () => {
    setShowToast(false)
  }

  const mutation = useMutation(requestSignUp, {
    onError: (error) => {
      if (isAxiosError(error)) {
        if (error.response) {
          setToastMsg(error.response.data.message)
          setVariant('danger')
          setShowToast(() => true)
        }
      }
    },
    onSuccess: () => {
      setToastMsg('회원가입에 성공했습니다.')
      setVariant('success')
      setShowToast(true)
    },
  })

  const onSubmit = async (data: FormData) => {
    console.log(data)
    try {
      await mutation.mutateAsync(data)
      navigate('/sign-in')
    } catch (e) {}
  }

  const password = watch('password', '')

  return (
    <S.SignContainer>
      <S.FormContainer onSubmit={handleSubmit(onSubmit)}>
        <div className="info-item">
          <Form.Label htmlFor="email">이메일</Form.Label>
          <Form.Control
            type="text"
            id="email"
            aria-describedby="email"
            {...register('email', {
              required: '이메일을 입력해주세요.',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: '올바른 이메일 형식이 아닙니다.',
              },
            })}
          />
          {errors.email && <S.FormText id="email">{errors.email.message}</S.FormText>}
        </div>
        <div className="info-item">
          <Form.Label htmlFor="password">패스워드</Form.Label>
          <Form.Control
            type="password"
            id="password"
            aria-describedby="password"
            {...register('password', {
              required: '패스워드를 입력해주세요.',
              minLength: {
                value: 4,
                message: '패스워드는 최소 4자리여야 합니다.',
              },
              pattern: {
                value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/,
                message: '패스워드는 하나의 문자와 하나의 숫자가 포함되어야 합니다.',
              },
            })}
          />
          {errors.password && <S.FormText id="password">{errors.password.message}</S.FormText>}
        </div>
        <div className="info-item">
          <Form.Label htmlFor="passwordCheck">패스워드 확인</Form.Label>
          <Form.Control
            type="password"
            id="passwordCheck"
            aria-describedby="passwordCheck"
            {...register('passwordCheck', {
              required: '패스워드를 입력해주세요',
              validate: (value) => value === password || '입력한 패스워드와 일치하지 않습니다.',
            })}
          />
          {errors.passwordCheck && <S.FormText id="passwordCheck">{errors.passwordCheck.message}</S.FormText>}
        </div>
        <div className="info-item">
          <Form.Label htmlFor="nick-name">닉네임</Form.Label>
          <Form.Control
            type="text"
            id="nick-name"
            aria-describedby="nick-name"
            {...register('nickname', {
              required: '닉네임을 입력해주세요',
            })}
          />
          {errors.nickname && <S.FormText id="nick-name">{errors.nickname.message}</S.FormText>}
        </div>
        <div className="info-item">
          <Form.Label htmlFor="phone">전화번호</Form.Label>
          <Form.Control
            type="phone"
            id="phone"
            aria-describedby="phone"
            {...register('phoneNumber', {
              required: '전화번호를 입력해주세요',
              pattern: {
                value: /^\d{10,11}$/,
                message: '전화번호는 10~11자리여야합니다.',
              },
            })}
          />
          {errors.phoneNumber && <S.FormText id="phone">{errors.phoneNumber.message}</S.FormText>}
        </div>
        <Button type="submit">가입하기</Button>
      </S.FormContainer>
      <ToastAlarm show={showToast} onClose={onClose} message={toastMsg} variant={variant} />
    </S.SignContainer>
  )
}

export default SignUp
