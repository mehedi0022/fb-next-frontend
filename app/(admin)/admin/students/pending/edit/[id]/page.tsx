'use client'
import { useGetSellerByidQuery } from '@/appstore/modules/seller/api'
import React from 'react'

type Props = {
  params: { id: number }
}

function EditPage({ params }: Props) {
  const { id } = params 
  const {data} = useGetSellerByidQuery(id)
  console.log(data)

  return (
    <div>
      <h1>Edit Page</h1>
      <p>Seller ID: {id}</p>
    </div>
  )
}

export default EditPage