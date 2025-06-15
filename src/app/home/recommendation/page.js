'use client'

import { Suspense } from 'react'
import Recommendation from '@/app/suspense/students/recommendation-suspense'

export default function Rekomen() {
    return (
      <Suspense>
        <Recommendation />
      </Suspense>
    )
}