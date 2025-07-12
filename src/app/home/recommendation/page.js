import { Suspense } from 'react'
import Recommendation from '@/app/suspense/students/recommendation-suspense'

export const metadata = {
  title: 'Rekomendasi',
  description: 'Saran terbaik berdasarkan hasil Assessment Pelajar.',
}

export default function Rekomen() {
    return (
      <Suspense>
        <Recommendation />
      </Suspense>
    )
}