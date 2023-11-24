import styled from 'styled-components'

export const LayoutBox = styled.div`
  display: grid;
  height: 100vh;
  grid-template-rows: 80px 1fr;
`

export const OutletWrap = styled.div`
  width: 100%;
  grid-row-start: 2;
  grid-row-end: 3;
  overflow-y: auto;
`
