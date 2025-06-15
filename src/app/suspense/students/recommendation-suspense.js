'use client';
import axios from 'axios';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ArrowRightIcon, ArrowUpRightIcon } from '@heroicons/react/24/solid'

export default function Recommendation() {
  const searchParams = useSearchParams();
  const [low, setLow] = useState([]);
  const [medium, setMedium] = useState([]);
  const [high, setHigh] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const encodedAnswers = searchParams.get('answers');
      if (!encodedAnswers) return;

      try {
        const answers = JSON.parse(decodeURIComponent(encodedAnswers));
        const intensity = answers[0]?.intensity;

         const saveRes = await axios.post('https://sejiwa.onrender.com/api/assessment/answer', {
          answers: answers,
        });

        const res = await axios.post('https://sejiwa.onrender.com/api/assessment/submit', {
          answers: answers,
        });

        const recommendations = res.data.recommendations.map((r) => ({
          ...r,
          type: r.type.trim().toLowerCase(),
        }));

        if (intensity === "low") {
          setLow(recommendations.filter(r => r.type === 'poster'));
        } else if (intensity === "medium") {
          setMedium(recommendations.filter(r => r.type === 'artikel'));
        } else if (intensity === "high") {
          setHigh(recommendations.filter(r => r.type === 'video'));
        }
      } catch (err) {
        console.error('Error fetching recommendations:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchParams]);

  if (loading) return (
    <div className="m-auto flex flex-col justify-center items-center gap-4">
      <p className="text-gray-700">Kamu belum mengisi Assessment</p>
      <Link href="/home/assessment" className="px-5 py-2 rounded-4xl bg-sky-600 hover:bg-sky-500 text-sky-50 flex items-center">Pergi ke Assessment <ArrowRightIcon className="size-4"/></Link>
    </div>
  )

  const RecommendationCard = ({ item }) => (
    <div className="p-4 border rounded bg-white shadow">
      <p className="text-xs uppercase text-blue-500">{item.type}</p>
      <h2 className="text-lg font-semibold">{item.title}</h2>
      <p className="text-sm text-gray-600">{item.description}</p>
      <p className="text-sm text-gray-600">{item.motivational_quote}</p>
      <a href={item.url} target="_blank" className="text-blue-600 text-sm mt-2 block" rel="noopener noreferrer">Lihat →</a>
    </div>
  );

  return (
    <div className="flex-1 flex-row p-6 bg-gray-100 dark:bg-gray-900 text-black dark:text-white">
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Rekomendasi untukmu</h1>

        {low.length > 0 && (
          <>
            <h2 className="text-xl font-semibold mb-2">Poster</h2>
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
              {low.map((item) => (
                <RecommendationCard key={item.id} item={item} />
              ))}
            </div>
          </>
        )}

        {medium.length > 0 && (
          <>
            <h2 className="text-xl font-semibold mb-2">Artikel</h2>
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
              {medium.map((item) => (
                <RecommendationCard key={item.id} item={item} />
              ))}
            </div>
          </>
        )}

        {high.length > 0 && (
          <>
            <h2 className="text-xl font-semibold mb-2">Video</h2>
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
              {high.map((item) => (
                <RecommendationCard key={item.id} item={item} />
              ))}
            </div>
          </>
        )}
      </div>
      <div className="p-6 flex flex-col gap-5">
        Kebingungan? Mari hubungi konselor <br/>untuk penjelasan lebih lanjut
        <Link href="/home/chat/" className="flex gap-2 justify-center items-center w-40 h-10 rounded-2xl bg-sky-600 hover:bg-sky-500">
        Chat Konselor<ArrowUpRightIcon className="size-4"/>
        </Link>
      </div>
    </div>
  );
}