import React, { Suspense } from 'react'
import LandingPage from '../components/categories/LandingPage'


export default function page() {
  return (
    <div>
      <Suspense fallback={<div className="h-96 bg-gray-50 animate-pulse" />}>
        <LandingPage />
      </Suspense>
    </div>
  )
}
