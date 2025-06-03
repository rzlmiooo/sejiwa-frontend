'use client'

import axios from 'axios'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Params() {
  const searchParams = useSearchParams()
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const encodedAnswers = searchParams.get('answers');
      if (!encodedAnswers) return;

      try {
        const answers = JSON.parse(decodeURIComponent(encodedAnswers));

        const res = await axios.post('https://sejiwa.onrender.com/api/assessment/submit', {
          answers: answers
        })

        setData(res.data.recommendations)
      } catch (err) {
        console.error('Error fetching recommendations:', err)
      } finally {
        setLoading(false)
      }
    };

    fetchData();
  }, [searchParams])

  if (loading) return <p className="p-4">Loading...</p>
  return (
    <div className="flex h-screen">
          {/* Main content */}
          <main className="flex-1 p-6 bg-gray-100 dark:bg-gray-900 text-black dark:text-white">
            {/* Add your content here */}
            <div className="p-6">
              <h1 className="text-2xl font-bold mb-4">Rekomendasi untukmu</h1>
              <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                {data.map(item => (
                  <div key={item.id} className="p-4 border rounded bg-white shadow">
                    <p className="text-xs uppercase text-blue-500">{item.type}</p>
                    <h2 className="text-lg font-semibold">{item.title}</h2>
                    <p className="text-sm text-gray-600">{item.description}</p>
                    <a href={item.url} target="_blank" className="text-blue-600 text-sm mt-2 block">Lihat →</a>
                  </div>
                ))}
              </div>
            </div>
          </main>
        </div>
  )
}
