'use client'

import { Suspense } from 'react'
import Recommendation from '@/app/suspense/recommendation-suspense'

export default function Rekomen() {
    return (
      <Suspense>
        <Recommendation />
      </Suspense>
    )
}