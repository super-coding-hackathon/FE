import styled from 'styled-components'
import { NavLink, Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { isLoggedInState } from '../../atoms/userAtoms'
import { useRecoilState } from 'recoil'
import { useState } from 'react'
import * as S from './header.style'

const Header = () => {
  // const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState)
  const [isLoggedIn, setIsLoggedIn] = useState(sessionStorage.getItem('token'))

  const logout = () => {
    setIsLoggedIn(false)
    sessionStorage.removeItem('token')
  }

  const checkLogIn = () => {
    if (isLoggedIn) {
      return (
        <>
          <Button>
            <S.CustomLink to="/register">매물등록하기</S.CustomLink>
          </Button>
          <Button>
            <S.CustomLink to="/mypage">마이페이지</S.CustomLink>
          </Button>
          <Button>
            <S.CustomLink to="/" onClick={logout}>
              로그아웃
            </S.CustomLink>
          </Button>
        </>
      )
    }
    return (
      <>
        <Button>
          <S.CustomLink to="/sign-up">회원가입</S.CustomLink>
        </Button>
        <Button>
          <S.CustomLink to="/sign-in">로그인</S.CustomLink>
        </Button>
      </>
    )
  }

  return (
    <S.HeaderWrapper>
      <div className="header-left">
        <S.CustomNav to="/">
          <img className="logo" src="/img/hackbang.png" alt="logo" />
        </S.CustomNav>
        <S.CategoryList>
          <li>
            <S.CustomNav to="/apart">아파트</S.CustomNav>
          </li>
          <li>
            <S.CustomNav to="/office">오피스텔</S.CustomNav>
          </li>
          <li>
            <S.CustomNav to="/studio">원룸</S.CustomNav>
          </li>
        </S.CategoryList>
      </div>

      <S.BtnWrap>{checkLogIn()}</S.BtnWrap>
    </S.HeaderWrapper>
  )
}

export default Header
