'use client';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Like() {
    const searchParams = useSearchParams();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const fetchData = async () => {
        const encodedAnswers = searchParams.get('answers');
        if (!encodedAnswers) return;

        try {
          const answers = JSON.parse(decodeURIComponent(encodedAnswers));

          const res = await axios.post('https://sejiwa.onrender.com/api/assessment/submit', {
            answers: answers
          });

          setData(res.data.recommendations); 
        } catch (err) {
          console.error('Error fetching recommendations:', err);
        } finally {
          setLoading(false);
        }
    };

    fetchData();
    }, [searchParams]);

    if (loading) return <p className="p-4">Loading...</p>;
    return (
        <div className="flex-1 h-screen">
          {/* Sidebar toggle button for small screens */}
          {/* <button
            data-drawer-target="default-sidebar"
            data-drawer-toggle="default-sidebar"
            aria-controls="default-sidebar"
            type="button"
            className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          >
            <span className="sr-only">Open sidebar</span>
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path
                clipRule="evenodd"
                fillRule="evenodd"
                d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
              />
            </svg>
          </button> */}
    
          {/* Sidebar */}
          {/* < Leftbar /> */}
    
          {/* Main content */}
          <main className="flex-1 h-screen p-6 bg-gray-100 dark:bg-gray-900 text-black dark:text-white">
            {/* <Topbar /> */}
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
    );
}