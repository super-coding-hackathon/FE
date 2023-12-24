import styled from 'styled-components'
import { LuListFilter } from 'react-icons/lu'
import { useState } from 'react'
import FilterSection from './FilterSection'
import { ChangeFilterArg, SortedType } from '../../hooks/useMapFilterState'

export type FilterCardProps = {
  isParking: boolean | undefined
  priceFilter: number
  squareFeetFilter: number
  sorted: SortedType
  changeFilterFn: (filterState: ChangeFilterArg) => void
}

function FilterCard({ isParking, priceFilter, squareFeetFilter, sorted, changeFilterFn }: FilterCardProps) {
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
          <FilterSectionWrap>
            <FilterSection
              sectionTitle="주차 여부"
              filterType="isParking"
              isParking={isParking}
              changeFilterFn={changeFilterFn}
            />
            <FilterSection
              sectionTitle="면적"
              filterType="square"
              squareFeetFilter={squareFeetFilter}
              changeFilterFn={changeFilterFn}
            />
            <FilterSection
              sectionTitle="가격"
              filterType="price"
              priceFilter={priceFilter}
              changeFilterFn={changeFilterFn}
            />
          </FilterSectionWrap>
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

const FilterSectionWrap = styled.div`
  display: grid;
  grid-auto-rows: min-content;
  gap: 10px;
`

const BtnWrap = styled.div`
  place-self: center;
`

const CloseFilterCardBtn = styled.button``
