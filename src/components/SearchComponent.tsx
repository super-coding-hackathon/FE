import { Button, InputGroup, Form } from 'react-bootstrap'
import styled from 'styled-components'
import SearchList from './SearchList'
import useDebouncedAddressData from '../hooks/useDebouncedAddressData'

type Props = {
  category: number
}

const SearchComponent = ({ category }: Props) => {
  const { value, data, handleInputChange, handleItemSelect, open } = useDebouncedAddressData(300)

  return (
    <div>
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
    </div>
  )
}

export default SearchComponent

const CustomInput = styled(InputGroup)`
  margin-top: 20px;
  width: 500px;
`
