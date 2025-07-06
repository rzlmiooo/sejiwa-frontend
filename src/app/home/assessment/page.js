"use client";

import axios from 'axios';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from 'next/link';
import { ArrowRightIcon } from '@heroicons/react/24/solid';

export default function Ass() {
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

    // useEffect(() => {
    //     if (!token) return;

    //     const fetchQuestions = async () => {
    //         try {
    //             const res = await axios.get('https://sejiwa.onrender.com/api/assessment/questions', {
    //                 headers: {
    //                     Authorization: `Bearer ${token}`,
    //                     'Content-Type': 'application/json',
    //                 },
    //             });
    //             setQuestions(res.data);
    //         } catch (err) {
    //             console.error('Error fetching questions', err);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };
    //     fetchQuestions();
    // }, []);

    // const handleChange = (id, field, value) => {
    //     setAnswers(prev => ({
    //         ...prev,
    //         [id]: {
    //             ...prev[id],
    //             [field]: value,
    //         },
    //     }));
    // };


    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     const validQuestionIds = questions.map(q => q.id);
    //     const submitted = {
    //         answers: Object.entries(answers)
    //             .filter(([id, val]) => val.checked)
    //             .map(([id, val]) => {
    //                 const question = questions.find(q => q.id === Number(id));
    //                 return {
    //                     code: question?.code,
    //                     intensity: val.intensity,
    //                 };
    //             })
    //     };
    //     try {
    //         console.log('Submitted Payload:', submitted);

    //         await axios.post('https://sejiwa.onrender.com/api/assessment/submit', submitted);
            
    //         const query = encodeURIComponent(JSON.stringify(submitted.answers));
    //         router.push(`/home/recommendation?answers=${query}`);
    //     } catch (err) {
    //         console.error('Submission error', err);
    //         alert('Failed to submit.');
    //     }
    // };

    // if (loading) return <p>Loading questions...</p>;

    useEffect(() => {
        if (!token) return;

        const fetchQuestions = async () => {
            try {
                const res = await axios.get('https://sejiwa.onrender.com/api/assessment/questions', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                setQuestions(res.data);
            } catch (err) {
                console.error('Error fetching questions', err);
            } finally {
                setLoading(false);
            }
        };
        fetchQuestions();
    }, []);

    const handleChange = (id, field, value) => {
        setAnswers(prev => ({
            ...prev,
            [id]: {
                ...prev[id],
                [field]: value,
            },
        }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        const validQuestionIds = questions.map(q => q.id);
        const submitted = {
            answers: Object.entries(answers)
                .filter(([id, val]) => val.checked)
                .map(([id, val]) => {
                    const question = questions.find(q => q.id === Number(id));
                    return {
                        code: question?.code,
                        intensity: val.intensity,
                    };
                })
        };

        try {
            console.log('Submitted Payload:', submitted);

            await axios.post('https://sejiwa.onrender.com/api/assessment/submit', submitted);

            const query = encodeURIComponent(JSON.stringify(submitted.answers));
            router.push(`/home/recommendation?answers=${query}`);
        } catch (err) {
            console.error('Submission error', err);
            alert('Failed to submit.');
        }
    };

    if (loading) return <p>Loading questions...</p>;

    return (    
        <div className="flex-1 h-screen w-full overflow-auto">
            {/* Main content */}
            <main className="flex flex-col overflow-x-auto min-h-screen p-8 bg-gray-100 dark:bg-gray-900 text-black dark:text-white">
                <div className='ml-4 sm:ml-18 flex gap-4 z-10 justify-between'>
                    <div className="flex flex-col">
                        <h1 className="text-2xl font-bold">Assessment</h1>
                        <h2 className="text-sm/6 font-medium">Isi survei dibawah sesuai dengan kondisimu sekarang.</h2>
                    </div>
                    <Link href="/home/assessment/hasil-assessment" className="flex gap-2 justify-center items-center px-3 my-2 mr-10 rounded-xl bg-sky-600 hover:bg-sky-500 font-medium">
                        Hasil Assessment <ArrowRightIcon className="hidden sm:inline size-4"/>
                    </Link>
                </div>
                {/* <!-- Table Section --> */}
                <div className="mt-[60px] px-2 py-10 lg:px-8 lg:py-14 mx-auto z-50 bg-gray-100 dark:bg-gray-900 text-black dark:text-white">
                    {/* Card */}
                    <div className="flex flex-col">
                        <div className="-m-1.5 p-1.5 inline-block align-middle">
                        <div className="min-w-full sm:min-w-max bg-white border border-gray-200 rounded-xl shadow-md dark:bg-neutral-900 dark:border-neutral-700">
                            {/* Header */}
                            <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-b border-gray-200 dark:border-neutral-700">
                            {/* Input */}
                            <div className="sm:col-span-1">
                                <label htmlFor="search-input" className="sr-only">Apa yang kamu rasakan?</label>
                                <div className="relative">
                                <input
                                    type="text"
                                    id="search-input"
                                    className="py-2 px-3 ps-11 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                                    placeholder="Cari"
                                />
                                <div className="absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none">
                                    <svg className="size-4 text-gray-400 dark:text-neutral-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <circle cx="11" cy="11" r="8" />
                                    <path d="M21 21l-4.3-4.3" />
                                    </svg>
                                </div>
                                </div>
                            </div>

                            {/* Buttons */}
                            <div className="sm:col-span-2 md:grow">
                                <div className="flex justify-end gap-x-2">
                                {/* Export Button */}
                                <div className="relative">
                                    <button
                                    type="button"
                                    className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow hover:bg-gray-50 dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700"
                                    >
                                    <svg className="size-4" viewBox="0 0 24 24" stroke="currentColor" fill="none">
                                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                        <polyline points="7 10 12 15 17 10" />
                                        <line x1="12" x2="12" y1="15" y2="3" />
                                    </svg>
                                    Export
                                    </button>
                                </div>

                                {/* Filter Button */}
                                <div className="relative" data-hs-dropdown-auto-close="inside">
                                    <button
                                    type="button"
                                    className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow hover:bg-gray-50 dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700"
                                    >
                                    <svg className="size-4" viewBox="0 0 24 24" stroke="currentColor" fill="none">
                                        <path d="M3 6h18" />
                                        <path d="M7 12h10" />
                                        <path d="M10 18h4" />
                                    </svg>
                                    Filter
                                    <span className="ps-2 text-xs font-semibold text-blue-600 border-s border-gray-200 dark:border-neutral-700 dark:text-blue-500">
                                        1
                                    </span>
                                    </button>
                                </div>
                                </div>
                            </div>
                            </div>

                            {/* Table */}
                            <form onSubmit={handleSubmit} className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                                <thead className="bg-gray-50 dark:bg-neutral-800">
                                <tr>
                                    <th className="px-6 py-3 text-start text-xs font-semibold uppercase text-gray-800 dark:text-neutral-200">Emosi / Kondisi</th>
                                    <th className="px-1 py-3 text-start text-xs font-semibold uppercase text-gray-800 dark:text-neutral-200">Check</th>
                                    <th className="px-6 py-3 text-start text-xs font-semibold uppercase text-gray-800 dark:text-neutral-200">Intensitas</th>
                                    <th className="px-6 py-3 text-start text-xs font-semibold uppercase text-gray-800 dark:text-neutral-200">Kata-kata Motivasi</th>
                                </tr>
                                </thead>

                                <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                                {questions.map((q) => (
                                    <tr key={q.id} className="bg-white hover:bg-gray-50 dark:bg-neutral-900 dark:hover:bg-neutral-800">
                                    <td className="px-6 py-4 text-sm font-semibold text-gray-800 dark:text-neutral-200">{q.label}</td>
                                    <td className="px-1 py-4">
                                        <input
                                        type="checkbox"
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm"
                                        onChange={e => handleChange(q.id, 'checked', e.target.checked)}
                                        />
                                    </td>
                                    <td className="px-6 py-4">
                                        <select
                                        onChange={e => handleChange(q.id, 'intensity', e.target.value)}
                                        className="border rounded px-2 py-1 text-sm dark:bg-neutral-800 dark:text-white"
                                        >
                                        <option value="">-</option>
                                        <option value="low">Low</option>
                                        <option value="medium">Medium</option>
                                        <option value="high">High</option>
                                        </select>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-neutral-300">
                                        {q.quote}
                                    </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>

                            <div className="mt-4">
                                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                                Kirim Assessment
                                </button>
                            </div>
                            </form>

                            {/* Footer */}
                            <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-t border-gray-200 dark:border-neutral-700">
                            <div className="max-w-sm space-y-3">
                                <select
                                defaultValue="5"
                                className="py-2 px-3 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400"
                                >
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                                <option>6</option>
                                </select>
                            </div>

                            <div>
                                <div className="inline-flex gap-x-2">
                                <button
                                    type="button"
                                    className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow hover:bg-gray-50 dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700"
                                >
                                    <svg className="size-4" viewBox="0 0 24 24" stroke="currentColor" fill="none">
                                    <path d="M15 18l-6-6 6-6" />
                                    </svg>
                                    Prev
                                </button>

                                <button
                                    type="button"
                                    className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow hover:bg-gray-50 dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700"
                                >
                                    Next
                                    <svg className="size-4" viewBox="0 0 24 24" stroke="currentColor" fill="none">
                                    <path d="M9 18l6-6-6-6" />
                                    </svg>
                                </button>
                                </div>
                            </div>
                            </div>
                            {/* End Footer */}
                        </div>
                        </div>
                    </div>
                </div>
                {/* <!-- End Table Section --> */}
            </main>
        </div>
    )
}