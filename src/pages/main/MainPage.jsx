import InputGroup from 'react-bootstrap/InputGroup'
import Form from 'react-bootstrap/Form'
import { Button, ButtonGroup, ToggleButton } from 'react-bootstrap'
import styled from 'styled-components'
import SearchList from '../../components/SearchList'
import useDebouncedAddressData from '../../hooks/useDebouncedAddressData'
import { useRecoilState } from 'recoil'
import { currentCategory } from '../../atoms/categoryAtoms'

const MainPage = () => {
  const { value, data, handleInputChange, handleItemSelect, open } = useDebouncedAddressData(600)
  const [category, setCategory] = useRecoilState(currentCategory)

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
      <CustomInput>
        <Form.Control
          placeholder="매물의 주소를 입력하세요"
          aria-describedby="search"
          value={value}
          onChange={handleInputChange}
        />
        <Button variant="dark">검색</Button>
      </CustomInput>
      {open && <SearchList data={data} handleSelect={handleItemSelect} category={category} />}
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
