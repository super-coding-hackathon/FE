import { Link, NavLink } from 'react-router-dom'
import styled from 'styled-components'

export const HeaderWrapper = styled.header`
  height: 80px;
  border-bottom: 1px solid rgba(53, 52, 52, 0.178);
  display: flex;
  justify-content: space-between;
  .header-left {
    display: flex;
    align-items: center;
    padding-left: 120px;
  }
`

export const CategoryList = styled.ul`
  display: flex;
  margin-left: 50px;
  gap: 5px;
  li {
    font-weight: bold;
    font-size: 27px;
    padding: 5px 10px;
  }
`

export const CustomNav = styled(NavLink)`
  text-decoration: none;
  color: black;

  &.active {
    color: red;
  }
  .logo {
    width: 100px;
    aspect-ratio: 16 /9;
  }
`

export const BtnWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  padding-right: 120px;
`

export const CustomLink = styled(Link)`
  text-decoration: none;
  color: white;
`

export const LogedInBtn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  p {
    font-size: 14px;
    display: flex;
    justify-content: end;
    span {
      font-size: 16px;
      font-weight: 700;
      margin-left: 4px;
    }
  }
  .btn-container {
    display: flex;
    gap: 10px;
  }
`
