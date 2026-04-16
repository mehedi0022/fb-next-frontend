import React, { Suspense } from 'react'
import CategoryList from '../components/categories/CategoryList';


export default function page({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  return (
    <div>
      <Suspense fallback={<div className="h-96 bg-gray-50 animate-pulse" />}>
        <CategoryList searchParams={searchParams} />
      </Suspense>
    </div>
  )
}
