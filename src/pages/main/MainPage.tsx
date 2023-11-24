import { ButtonGroup, ToggleButton } from 'react-bootstrap'
import { useRecoilState } from 'recoil'
import { currentCategory } from '../../atoms/categoryAtoms'
import SearchComponent from '../../components/SearchComponent'
import * as S from './main.style'

const Btns = [
  {
    id: 1,
    variant: 'outline-success',
    text: '아파트',
  },
  {
    id: 2,
    variant: 'outline-success',
    text: '오피스텔',
  },
  {
    id: 3,
    variant: 'outline-success',
    text: '원룸',
  },
]

const MainPage = () => {
  const [category, setCategory] = useRecoilState(currentCategory)

  return (
    <S.MainContainer>
      <ButtonGroup>
        {Btns.map((btn) => (
          <ToggleButton
            key={btn.id}
            id={`${btn.id}`}
            value={btn.id}
            type="radio"
            variant={btn.variant}
            checked={category === btn.id}
            onClick={() => setCategory(btn.id)}
          >
            {btn.text}
          </ToggleButton>
        ))}
      </ButtonGroup>
      <SearchComponent category={category} />
    </S.MainContainer>
  )
}

export default MainPage
