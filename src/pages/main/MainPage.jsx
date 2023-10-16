import { ButtonGroup, ToggleButton } from 'react-bootstrap'
import { useRecoilState } from 'recoil'
import { currentCategory } from '../../atoms/categoryAtoms'
import SearchComponent from '../../components/SearchComponent'
import { useNavigate } from 'react-router-dom'
import * as S from './main.style'

const MainPage = () => {
  const [category, setCategory] = useRecoilState(currentCategory)
  const navigate = useNavigate()
  const searchAddress = (categoryId) => {
    switch (categoryId) {
      case 1:
        navigate('/apart')
        break
      case 2:
        navigate('/office')
        break
      case 3:
        navigate('/studio')
        break
      default:
        return
    }
  }

  return (
    <S.MainContainer>
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
      <SearchComponent category={category} onClick={() => searchAddress(category)} />
    </S.MainContainer>
  )
}

export default MainPage
