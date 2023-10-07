import styled from 'styled-components'
import MapComponent from '../../components/MapComponent'

const Office = () => {
  return (
    <Wrap>
      <MapComponent />
      <ListUl></ListUl>
    </Wrap>
  )
}

export default Office

const Wrap = styled.div`
  display: grid;
  grid-template-columns: 1fr 300px;
  height: 100%;
`
const ListUl = styled.ul``
