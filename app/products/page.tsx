import React from 'react'
import ProductsList from '../components/products/ProductsList'

export default function page({
  searchParams,
}: {
  searchParams: { product?: string };
}) {
  return (
    <div>
      <ProductsList searchParams={searchParams} />
    </div>
  )
}
