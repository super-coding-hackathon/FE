import { memo } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

function shallowEqual(prevProps, nextProps) {
  const keys1 = Object.keys(prevProps)
  const keys2 = Object.keys(nextProps)

  if (keys1.length !== keys2.length) {
    return false
  }

  return keys1.every((key) => prevProps[key] === nextProps[key])
}

const SaleListItem = memo(({ homeId, name, transactionType, deposit, price, onClick }) => {
  return (
    <Wrap key={homeId} onClick={onClick}>
      <Title>{name}</Title>
      <Type>거래형태 : {transactionType}</Type>
      <Deposit>계약금 : {deposit}</Deposit>
      <Price>가격 : {price}</Price>
      <Link to={`/building/${homeId}`}>거래신청</Link>
    </Wrap>
  )
}, shallowEqual)

export default SaleListItem

const Wrap = styled.div`
  /* width: 100%; */
  /* max-width: 300px; */
  width: 100%;
  /* display: grid; */
  border-bottom: 1px solid black;
  padding: 10px;
  cursor: pointer;
  /* background-color: skyblue; */
`

const Title = styled.h1`
  font-weight: bold;
  padding: 10px;
  font-size: 22px;
`

const Type = styled.div`
  padding: 8px;
`

const Deposit = styled.div`
  padding: 8px;
`

const Price = styled.div`
  padding: 8px;
`
