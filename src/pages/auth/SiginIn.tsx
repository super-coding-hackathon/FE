import { useForm } from 'react-hook-form'
import { Form, Button } from 'react-bootstrap'
import ToastAlarm from '../../components/ToastAlarm'
import api from '../../api/axiosInstance'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { useSetRecoilState } from 'recoil'
import { isLoggedInState } from '../../atoms/userAtoms'
import * as S from './auth.style'
import { isAxiosError } from 'axios'

type FormData = {
  email: string
  password: string
}

const requestSignIn = async (formdata: FormData) => {
  const response = await api.post('/api/user/login', formdata)
  return response.data
}

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ mode: 'onChange' })
  const [showToast, setShowToast] = useState(false)
  const [toastMsg, setToastMsg] = useState('')
  const [variant, setVariant] = useState('danger')
  const setIsLoggedIn = useSetRecoilState(isLoggedInState)

  const mutation = useMutation(requestSignIn, {
    onError: (error) => {
      if (isAxiosError(error)) {
        if (error.response) {
          setToastMsg(error.response.data.message)
          setVariant('danger')
          setShowToast(true)
        }
      }
    },
    onSuccess: (res) => {
      setToastMsg('로그인에 성공했습니다.')
      setVariant('success')
      setShowToast(true)
      setIsLoggedIn(true)
      sessionStorage.setItem('email', res.data.email)
      sessionStorage.setItem('nick', res.data.nickname)
    },
  })

  const navigate = useNavigate()

  const onClose = () => {
    setShowToast(false)
  }

  const onSubmit = async (formdata: FormData) => {
    // console.log(data)
    try {
      const response = await mutation.mutateAsync(formdata)
      sessionStorage.setItem('token', JSON.stringify(response.data.accessToken))
      navigate('/')
    } catch (e) {}
  }

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
        <Button type="submit">로 그 인</Button>
      </S.FormContainer>
      <ToastAlarm show={showToast} onClose={onClose} message={toastMsg} variant={variant} />
    </S.SignContainer>
  )
}

export default SignIn
