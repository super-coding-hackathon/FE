import styled from 'styled-components'
import { LuListFilter } from 'react-icons/lu'
import { useState } from 'react'
import { ButtonGroup, Button } from 'react-bootstrap'

function FilterCard() {
  const [open, setOpen] = useState(false)

  const toggleCard = () => {
    setOpen(!open)
  }

  return (
    <Wrap>
      {!open ? (
        <FilterBtn onClick={toggleCard}>
          필터
          <LuListFilter />
        </FilterBtn>
      ) : (
        <Card>
          <FliterWrap>
            <ButtonGroup>
              <Button>전체</Button>
              <Button>10평 미만</Button>
              <Button>10평</Button>
              <Button>20평</Button>
              <Button>30평</Button>
            </ButtonGroup>
          </FliterWrap>
          <BtnWrap>
            <CloseFilterCardBtn onClick={toggleCard}>확인</CloseFilterCardBtn>
          </BtnWrap>
        </Card>
      )}
    </Wrap>
  )
}

export default FilterCard

const Wrap = styled.div`
  position: absolute;
  left: 20px;
  top: 90px;
  z-index: 10;
`

const FilterBtn = styled.button``

const Card = styled.div`
  width: 450px;
  height: 400px;
  background-color: #fff;

  display: grid;
  grid-template-rows: 9fr 1fr;
`

const FliterWrap = styled.div``

const BtnWrap = styled.div``

const CloseFilterCardBtn = styled.button``
