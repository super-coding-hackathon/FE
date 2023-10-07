import styled from 'styled-components'
import { useForm } from 'react-hook-form'
import { Form, Button } from 'react-bootstrap'
import ToastAlarm from '../../components/ToastAlarm'
import api from '../../api/axiosInstance'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useSetRecoilState } from 'recoil'
import { isLoggedInState } from '../../atoms/userAtoms'

const requestSignIn = async (body) => {
  const response = await api.post('/api/user/login', body)
  return response.data
}

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onChange' })
  const [showToast, setShowToast] = useState(false)
  const [toastMsg, setToastMsg] = useState('')
  const [variant, setVariant] = useState('danger')
  const setIsLoggedIn = useSetRecoilState(isLoggedInState)

  const mutation = useMutation(requestSignIn, {
    onError: (error) => {
      setToastMsg(() => error.response.data.message)
      setVariant('danger')
      setShowToast(true)
    },
    onSuccess: () => {
      setToastMsg('로그인에 성공했습니다.')
      setVariant('success')
      setShowToast(true)
      setIsLoggedIn(true)
    },
  })

  const navigate = useNavigate()

  const onClose = () => {
    setShowToast(false)
  }

  const onSubmit = async (data) => {
    // console.log(data)
    try {
      const response = await mutation.mutateAsync(data)
      sessionStorage.setItem('token', JSON.stringify(response.data.accessToken))
      navigate('/')
    } catch (e) {}
  }

  return (
    <Wrap>
      <CustomForm onSubmit={handleSubmit(onSubmit)}>
        <div>
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
          {errors.email && <FormText id="email">{errors.email.message}</FormText>}
        </div>
        <div>
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
          {errors.password && <FormText id="password">{errors.password.message}</FormText>}
        </div>
        <Button type="submit">로 그 인</Button>
      </CustomForm>
      <ToastAlarm show={showToast} onClose={onClose} message={toastMsg} variant={variant} />
    </Wrap>
  )
}

export default SignIn

const Wrap = styled.div`
  height: 100%;
  background-color: gray;

  display: grid;
  place-items: center;
`

const CustomForm = styled.form`
  width: 400px;
  height: 550px;
  max-height: 550px;
  display: grid;
  grid-gap: 12px;
  grid-template-rows: repeat(6, 1fr);
`

const FormText = styled(Form.Text)`
  color: red;
`
