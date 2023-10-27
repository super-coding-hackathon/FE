import ListGroup from 'react-bootstrap/ListGroup'
import styled from 'styled-components'
import { mapDataType } from '../hooks/useMapByAddress'
import { useNavigate } from 'react-router-dom'

type Props = {
  data: mapDataType[]
  handleSelect: (item: mapDataType, category: string) => void
  category: string
}

const SearchList = ({ data, handleSelect, category }: Props) => {
  const navigate = useNavigate()

  return (
    <CustomUl as="ul">
      {data.length > 0 ? (
        data.slice(0, 7).map((item) => (
          <CustomLi
            key={item.id}
            as="li"
            onClick={() => {
              handleSelect(item, category)
              navigate(`/${category}`)
            }}
          >
            {item.place_name}
          </CustomLi>
        ))
      ) : (
        <CustomLi>데이터 없음</CustomLi>
      )}
    </CustomUl>
  )
}

export default SearchList

const CustomUl = styled(ListGroup)`
  margin-top: 20px;
  width: 490px;
  background-color: rgb(0, 128, 0, 0.2);
`

const CustomLi = styled(ListGroup.Item)`
  height: 50px;
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 10px;

  &:hover {
    background-color: #dadada;
  }
`
