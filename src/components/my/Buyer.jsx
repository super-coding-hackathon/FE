import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import { GetMyBought } from '../../api/my/get'
import Receipt from './Receipt'

const Buyer = ({ rendered }) => {
  const [page, setPage] = useState(0)
  const [size, setSize] = useState(8)

  const nextPage = () => {
    console.log('다음으로')
    setPage(page + 1)
  }

  const prevPage = () => {
    console.log('앞으로')
    setPage(page - 1)
  }

  const { data: boughtInfo } = useQuery(['boughtInfo', page, size], () => GetMyBought('boughtInfo', page, size), {
    onSuccess: (res) => {
      // console.log('구매현황')
      console.log(res)
    },
  })
  return <Receipt data={boughtInfo} rendered={rendered} page={page} nextPage={nextPage} prevPage={prevPage} />
}

export default Buyer
