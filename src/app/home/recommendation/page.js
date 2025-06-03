'use client'

import { Suspense } from 'react'
import Params from '@/app/components/middleman'

export default function Recommendation() {
    return (
      <Suspense>
        <Params/>
      </Suspense>
    )
}