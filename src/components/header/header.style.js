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
    padding-left: 80px;
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
  padding-right: 80px;
`

export const CustomLink = styled(Link)`
  text-decoration: none;
  color: white;
`
