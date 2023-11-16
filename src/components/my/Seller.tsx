import { FC, useState } from 'react'
import Receipt from './Receipt'
import { useQuery } from '@tanstack/react-query'
import { GetMySold } from '../../api/my/get'
import { IncludePage, RenderProps, SellerDetail } from './type'

const Seller: FC<RenderProps> = ({ rendered }) => {
  const [page, setPage] = useState(0)
  const size = 8
  // const [size, setSize] = useState(8)

  const { data: soldInfo } = useQuery<IncludePage<SellerDetail>>([page, size], () => GetMySold(page, size), {
    // onSuccess: (res) => {
    //   console.log('판매 현황 :::', res)
    // },
  })
  // const { data: soldInfo } = useQuery(['soldInfo'], GetMySold, {
  //   onSuccess: (res) => {
  //     // console.log('판매현황')
  //     // console.log(res)
  //   },
  // })

  // const nextPage = () => {
  //   console.log('다음으로')
  //   setPage(page + 1)
  //   setSize(0) // 수정 필요
  // }

  // const prevPage = () => {
  //   console.log('앞으로')
  //   setPage(page - 1)
  // }

  return (
    <>
      {soldInfo && (
        <Receipt
          data={soldInfo}
          rendered={rendered}
          // page={page}
          // nextPage={nextPage}
          // prevPage={prevPage}
          setPage={setPage}
        />
      )}
    </>
  )
}

export default Seller
