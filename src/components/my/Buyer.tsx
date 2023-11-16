import { useQuery } from '@tanstack/react-query'
import { FC, useState } from 'react'
import { GetMyBought } from '../../api/my/get'
import Receipt from './Receipt'
import { BuyerDetail, IncludePage, RenderProps } from './type'

const Buyer: FC<RenderProps> = ({ rendered }) => {
  const [page, setPage] = useState(0)
  const size = 8
  // const [size, setSize] = useState(8)

  // const nextPage = () => {
  //   console.log('다음으로')
  //   setPage(page + 1)
  //   setSize(0) // 수정필요
  // }

  // const prevPage = () => {
  //   console.log('앞으로')
  //   setPage(page - 1)
  // }

  const { data: boughtInfo } = useQuery<IncludePage<BuyerDetail>>(
    ['boughtInfo', page, size],
    () => GetMyBought(page, size),
    {
      onSuccess: (res) => {
        console.log(res)
      },
    },
  )
  return (
    <>
      {boughtInfo && (
        <Receipt
          data={boughtInfo}
          rendered={rendered}
          // page={page}
          setPage={setPage}
          // nextPage={nextPage}
          // prevPage={prevPage}
        />
      )}
    </>
  )
}

export default Buyer
