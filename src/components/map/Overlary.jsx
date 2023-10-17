import styled from 'styled-components'

const Overlay = ({ apartInfo }) => {
  return (
    <Wrap>
      <Title>아파트 명: {apartInfo.name}</Title>
      <div>매매 형태: {apartInfo.transactionType}</div>
      <div>계약금: {apartInfo.deposit}</div>
      <div>가격: {apartInfo.price}</div>
    </Wrap>
  )
}

export default Overlay

const Wrap = styled.div`
  display: grid;
  /* background-color: skyblue; */

  background-color: white;
  width: 180px;
  height: 110px;
`

const Title = styled.h1`
  font-weight: bold;
`
