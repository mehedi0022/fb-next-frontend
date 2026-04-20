import React from 'react'
import { ProductsList } from '@/components/home'
import { SearchParamsProps } from '@/lib/home'

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
