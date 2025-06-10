'use client'

import { Suspense } from 'react'
import Params from '@/app/suspense/recommendation-suspense'

export default function Recommendation() {
    return (
      <Suspense>
        <Params/>
      </Suspense>
    )
}