import { Button, ButtonGroup, ToggleButton, InputGroup, Form } from 'react-bootstrap'
import styled from 'styled-components'
import SearchList from '../../components/SearchList'
import useDebouncedAddressData from '../../hooks/useDebouncedAddressData'
import { useRecoilState } from 'recoil'
import { currentCategory } from '../../atoms/categoryAtoms'
import SearchComponent from '../../components/SearchComponent'
import { useNavigate } from 'react-router-dom'

const MainPage = () => {
  const [category, setCategory] = useRecoilState(currentCategory)
  const navigate = useNavigate()

  return (
    <Wrap>
      <ButtonGroup>
        <ToggleButton type="radio" variant={'outline-success'} checked={category === 1} onClick={() => setCategory(1)}>
          아파트
        </ToggleButton>
        <ToggleButton type="radio" variant={'outline-success'} checked={category === 2} onClick={() => setCategory(2)}>
          오피스텔
        </ToggleButton>
        <ToggleButton type="radio" variant={'outline-success'} checked={category === 3} onClick={() => setCategory(3)}>
          원룸
        </ToggleButton>
      </ButtonGroup>
      <SearchComponent category={category} onClick={() => navigate(`/${category}`)} />
    </Wrap>
  )
}

export default MainPage

const Wrap = styled.div`
  display: grid;
  place-content: center;
  padding-top: 200px;
`

const CustomInput = styled(InputGroup)`
  margin-top: 20px;
  width: 500px;
`
