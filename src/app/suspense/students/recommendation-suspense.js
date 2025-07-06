'use client';
import axios from 'axios';
import Link from 'next/link'
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getStudentId } from "../../utils/auth/auth";
import { ArrowUpRightIcon } from '@heroicons/react/24/solid';

export default function Recommendation() {
  const searchParams = useSearchParams();
  const [low, setLow] = useState([]);
  const [medium, setMedium] = useState([]);
  const [high, setHigh] = useState([]);
  const [loading, setLoading] = useState(true);
  const studentId = getStudentId();

  useEffect(() => {
    const fetchData = async () => {
      const encodedAnswers = searchParams.get('answers');

      console.log("Jawaban prop URL diatas:", encodedAnswers);

      if (!encodedAnswers) {
        setLoading(false);
        return;
      }

      try {
        const answers = JSON.parse(decodeURIComponent(encodedAnswers));

        const cleanedAnswers = answers.map(ans => ({
          ...ans,
          code: ans.code.trim(),
          intensity: ans.intensity.trim().toLowerCase() 
        }));

        console.log("Jawaban bersih e:", cleanedAnswers);

        const desiredRecommendationTypes = new Set();

        cleanedAnswers.forEach(answer => {
          if (answer.intensity === "low") {
            desiredRecommendationTypes.add('poster');
          } else if (answer.intensity === "medium") {
            desiredRecommendationTypes.add('artikel');
          } else if (answer.intensity === "high") {
            desiredRecommendationTypes.add('video');
          }
        });

        console.log("Hasil Akhir Rekomendasi Brok:", Array.from(desiredRecommendationTypes)); 

        const payloadForAssessment = {
          student_id: studentId,
          question_code: cleanedAnswers[0]?.code,
          submitted_at: new Date(),
        };

        console.log("Payload untuk Assessment (dikirim ke backend):", payloadForAssessment);

        await axios.post('https://sejiwa.onrender.com/api/assessment/answer', payloadForAssessment);

        const res = await axios.post('https://sejiwa.onrender.com/api/assessment/submit', {
          answers: cleanedAnswers,
        });

        const allRecommendationsFromBackend = res.data.recommendations.map((r) => ({
          ...r,
          type: r.type.trim().toLowerCase(), 
        }));

        console.log("Semua Rekomendasi dari Backend sebelum difilter dair Frontend:", allRecommendationsFromBackend);


        const filteredLow = [];
        const filteredMedium = [];
        const filteredHigh = [];

        allRecommendationsFromBackend.forEach(recommendation => {
          if (desiredRecommendationTypes.has(recommendation.type)) {
            if (recommendation.type === 'poster') {
              filteredLow.push(recommendation);
            } else if (recommendation.type === 'artikel') {
              filteredMedium.push(recommendation);
            } else if (recommendation.type === 'video') {
              filteredHigh.push(recommendation);
            }
          }
        });

        setLow(filteredLow);
        setMedium(filteredMedium);
        setHigh(filteredHigh);

        console.log("Fetch Low :", filteredLow);
        console.log("Fetch Medium :", filteredMedium);
        console.log("Fetch High :", filteredHigh);

      } catch (err) {
        console.error('Error fetching recommendations:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchParams, studentId]); 

  if (loading) return (
    <div className="m-auto flex flex-col justify-center items-center gap-4">
      <p className="text-gray-700 dark:text-gray-100">Kamu belum mengisi Assessment</p>
      <Link href="/home/assessment" className="px-5 py-2 rounded-4xl bg-sky-600 hover:bg-sky-500 text-sky-50 flex items-center">Pergi ke Assessment <ArrowUpRightIcon className="size-4"/></Link>
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
    <div className="flex mb-20 w-full overflow-y-scroll">
      <main className="flex-1 p-6 bg-gray-100 dark:bg-gray-900 text-black dark:text-white">
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
              <h2 className="text-xl font-semibold mb-2 mt-4">Artikel</h2>
              <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                {medium.map((item) => (
                  <RecommendationCard key={item.id} item={item} />
                ))}
              </div>
            </>
          )}

          {high.length > 0 && (
            <>
              <h2 className="text-xl font-semibold mb-2 mt-4">Video</h2>
              <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                {high.map((item) => (
                  <RecommendationCard key={item.id} item={item} />
                ))}
              </div>
            </>
          )}

          {low.length === 0 && medium.length === 0 && high.length === 0 && (
            <p className="text-gray-600">Tidak ada rekomendasi yang tersedia untuk jawaban Anda.</p>
          )}
        </div>
        <div className="p-6 flex flex-col gap-5">
          Kebingungan? Mari hubungi konselor <br/>untuk penjelasan lebih lanjut
          <Link href="/home/chat/" className="flex gap-2 justify-center items-center w-40 h-10 rounded-2xl bg-sky-600 hover:bg-sky-500">
            Chat Konselor<ArrowUpRightIcon className="size-4"/>
          </Link>
        </div>
      </main>
    </div>
  );
}