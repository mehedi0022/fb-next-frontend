import React, { Suspense } from 'react'
import { CategoryList } from '@/components';
import { SearchParamsProps } from '@/lib';

export default function page({
  searchParams,
}: {
  searchParams: SearchParamsProps;
}) {
  return (
    <div>
      <Suspense fallback={<div className="h-96 bg-gray-50 animate-pulse" />}>
        <CategoryList searchParams={searchParams} />
      </Suspense>
    </div>
  )
}
