import styled from 'styled-components'
import { NavLink, Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { isLoggedInState } from '../atoms/userAtoms'
import { useRecoilState } from 'recoil'

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState)

  const logout = () => {
    setIsLoggedIn(false)
    sessionStorage.removeItem('token')
  }

  return (
    <Wrapper>
      <LogoWrap>
        <CustomNav to="/">
          <Logo src="/img/hackbang.png" />
        </CustomNav>
      </LogoWrap>
      <CategoryList>
        <CategoryBtn>
          <CustomNav to="/1">아파트</CustomNav>
        </CategoryBtn>
        <CategoryBtn>
          <CustomNav to="/2">원룸</CustomNav>
        </CategoryBtn>
        <CategoryBtn>
          <CustomNav to="/3">오피스텔</CustomNav>
        </CategoryBtn>
      </CategoryList>
      <BtnWrap>
        {isLoggedIn ? (
          <>
            <Button>
              <CustomLink to="/mypage">마이페이지</CustomLink>
            </Button>
            <Button>
              <CustomLink to="/" onClick={logout}>
                로그아웃
              </CustomLink>
            </Button>
          </>
        ) : (
          <>
            {' '}
            <Button>
              <CustomLink to="/sign-up">회원가입</CustomLink>
            </Button>
            <Button>
              <CustomLink to="/sign-in">로그인</CustomLink>
            </Button>
          </>
        )}
      </BtnWrap>
    </Wrapper>
  )
}

export default Header

const Wrapper = styled.header`
  height: 80px;
  border-bottom: 1px solid rgba(53, 52, 52, 0.178);
  display: grid;
  grid-template-columns: repeat(30, 1fr);
`

const LogoWrap = styled.div`
  display: grid;
  place-items: center;
  grid-column-start: 1;
  grid-column-end: 5;

  min-width: 120px;
`

const Logo = styled.img`
  width: 100px;
  aspect-ratio: 16 / 9;
`

const CategoryList = styled.ul`
  display: grid;
  grid-template-columns: repeat(8, 1fr);

  grid-column-start: 5;
  grid-column-end: 26;
`

const CategoryBtn = styled.li`
  display: grid;
  place-items: center;
  font-weight: bold;
  font-size: 27px;
  min-width: 120px;
`

const CustomNav = styled(NavLink)`
  text-decoration: none;
  color: black;

  &.active {
    color: red;
  }
`

const BtnWrap = styled.div`
  grid-column: 26 / 31;
  display: flex;
  justify-content: space-around;
  align-items: center;
`

const CustomLink = styled(Link)`
  text-decoration: none;
  color: white;
`
