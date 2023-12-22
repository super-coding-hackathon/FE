import { Outlet } from 'react-router-dom'
import Header from '../components/header/Header'
import * as S from './generalLayout.style'

const GeneralLayout = () => {
  return (
    <S.LayoutBox>
      <Header />
      <S.OutletWrap>
        <Outlet />
      </S.OutletWrap>
    </S.LayoutBox>
  )
}

export default GeneralLayout
