import React, { useState } from 'react'
import Receipt from './Receipt'
import { useQuery } from '@tanstack/react-query'
import { GetMySold } from '../../api/my/get'

const Seller = ({ rendered }) => {
  const [page, setPage] = useState(0)
  const [size, setSize] = useState(8)

  const { data: soldInfo } = useQuery(['soldInfo', page, size], () => GetMySold('soldInfo', page, size), {
    onSuccess: (res) => {
      // console.log(res)
    },
  })
  // const { data: soldInfo } = useQuery(['soldInfo'], GetMySold, {
  //   onSuccess: (res) => {
  //     // console.log('판매현황')
  //     // console.log(res)
  //   },
  // })

  const nextPage = () => {
    console.log('다음으로')
    setPage(page + 1)
  }

  const prevPage = () => {
    console.log('앞으로')
    setPage(page - 1)
  }

  return <Receipt data={soldInfo} rendered={rendered} page={page} nextPage={nextPage} prevPage={prevPage} />
}

export default Seller
