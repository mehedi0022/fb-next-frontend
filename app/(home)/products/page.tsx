import React from 'react'
import { ProductsList, SearchParamsProps } from '@/lib'

export default function page({
  searchParams,
}: {
  searchParams: SearchParamsProps;
}) {
  return (
    <div>
      <ProductsList searchParams={searchParams} />
    </div>
  )
}
