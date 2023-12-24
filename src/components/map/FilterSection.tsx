import styled from 'styled-components'
import { ButtonGroup, ToggleButton } from 'react-bootstrap'
import { FilterCardProps } from './FilterCard'

type Props = Partial<FilterCardProps> & {
  sectionTitle: string
  filterType: string
}

function FilterSection({ sectionTitle, filterType }: Props) {
  return (
    <FliterWrap>
      <FilterTitleWrap>
        <FilterTitle>{sectionTitle}</FilterTitle>
      </FilterTitleWrap>
      <FilterBtns>
        <ToggleButton id={'1'} value={1} variant="outline-primary">
          전체
        </ToggleButton>
        <ToggleButton id={'2'} value={2}>
          10평 미만
        </ToggleButton>
        <ToggleButton id={'3'} value={3}>
          10평 이상 20평 미만
        </ToggleButton>
        <ToggleButton id={'4'} value={4}>
          20평 이상 30평 미만
        </ToggleButton>
        <ToggleButton id={'5'} value={5}>
          30평 이상
        </ToggleButton>
      </FilterBtns>
    </FliterWrap>
  )
}

export default FilterSection

const FliterWrap = styled.div`
  display: grid;
  grid-template-rows: 1fr 2fr;
`

const FilterTitleWrap = styled.div`
  place-self: center;
`

const FilterTitle = styled.h1``

const FilterBtns = styled(ButtonGroup)`
  margin: 0 20px;
`
