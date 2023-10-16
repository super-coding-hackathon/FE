import styled from 'styled-components'
import { Form } from 'react-bootstrap'

export const SignContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const FormContainer = styled.form`
  width: 700px;
  height: 550px;
  max-height: 550px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  .info-item {
    width: 400px;
  }
  button {
    width: 400px;
    margin-top: 20px;
  }
`

export const FormText = styled(Form.Text)`
  color: red;
`
