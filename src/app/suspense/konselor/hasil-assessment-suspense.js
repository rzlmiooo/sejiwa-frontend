"use client";

import axios from "axios";
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { getStudentId } from "@/app/utils/auth/auth";

export default function HasilAssessment() {
    const searchParams = useSearchParams();
    const userId = getStudentId();
    const [roomCodes, setRoomCodes] = useState([]); 
    const [assessmentAnswers, setAssessmentAnswers] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); 

    // pagination
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = roomCodes.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(roomCodes.length / itemsPerPage);

    // Pagination khusus untuk assessmentAnswers
    const [currentAssessmentPage, setCurrentAssessmentPage] = useState(1);
    const assessmentItemsPerPage = 5; // bebas, sama kayak roomCodes biar konsisten
    const indexOfLastAssessment = currentAssessmentPage * assessmentItemsPerPage;
    const indexOfFirstAssessment = indexOfLastAssessment - assessmentItemsPerPage;
    const currentAssessmentAnswers = assessmentAnswers.slice(indexOfFirstAssessment, indexOfLastAssessment);
    const totalAssessmentPages = Math.ceil(assessmentAnswers.length / assessmentItemsPerPage);

    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

    useEffect(() => {
        document.body.style.overflow = "hidden"; // brute-force
        return () => {
          document.body.style.overflow = ""; // restore
        };
    }, []);

    useEffect(() => {
        const fetchAllData = async () => {
            if (!token) {
                setLoading(false);
                setError("Authentication token not found.");
                return;
            }

            setLoading(true);
            setError(null); 

            try {
                const roomsRes = await axios.get('https://sejiwa.onrender.com/api/chats/rooms', { 
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                const allRooms = roomsRes.data || [];
                const filteredRooms = allRooms.filter(
                    (room) => String(room.student_id) === String(userId)
                );
                setRoomCodes(filteredRooms);

                const assessmentRes = await axios.get('https://sejiwa.onrender.com/api/assessment/answer', { 
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                const allAssessmentAnswers = assessmentRes.data || [];
                const filtered = allAssessmentAnswers.filter(
                    (answer) => answer.question_code != null
                )  
                setAssessmentAnswers(filtered);
                // console.log(allAssessmentAnswers);
                

            } catch (err) {
                console.error('Error fetching data:', err);
                setError("Failed to fetch data. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchAllData();
    }, [token]);

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <p className="text-xl dark:text-white">Loading assessment data...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex h-screen items-center justify-center">
                <p className="text-xl text-red-500 dark:text-red-400">{error}</p>
            </div>
        );
    }

    return (
        <div className="flex-1 overflow-y-scroll px-6 pb-10 bg-gray-100 dark:bg-gray-900 text-black dark:text-white">
            <section className="antialiased bg-sky-50 dark:bg-gray-900 md:py-10">
                <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                    <div className="mx-auto max-w-5xl">
                        <div className="gap-4 sm:flex sm:items-center sm:justify-between">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Hasil Assessment Pelajar</h2>
                        </div>
                        {roomCodes.length > 0 && (
                            <>
                                <h3 className="text-xl font-semibold mt-8 mb-4 dark:text-white">Daftar Booked Room:</h3>
                                <div className="flow-root sm:mt-8">
                                    <div className="divide-y divide-gray-200 dark:divide-gray-700">
                                    {currentItems.map((room) => (
                                        <div key={room.id} className="flex flex-wrap items-center gap-y-4 py-6">
                                            <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                                            <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Room ID:</dt>
                                            <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                                                <a href="#" className="hover:underline">{room.id}</a>
                                            </dd>
                                            </dl>
                                            <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                                            <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Judul Room:</dt>
                                            <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">{room.title || 'N/A'}</dd>
                                            </dl>
                                        </div>
                                        ))}
                                    </div>
                                </div>
                            </>
                        )}
                        {roomCodes.length === 0 && !loading && (
                            <p className="mt-4 text-gray-600 dark:text-gray-300">Belum ada Assessment.</p>
                        )}

                        <div className="mt-6 mb-10 flex items-center justify-center sm:mt-8" aria-label="Page navigation">
                        <ul className="flex h-8 items-center -space-x-px text-sm">
                            {/* Prev Button */}
                            <li>
                            <button
                                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                                disabled={currentPage === 1}
                                className="ms-0 flex h-8 items-center justify-center rounded-s-lg border border-e-0 border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                            >
                                <span className="sr-only">Previous</span>
                                <svg className="h-4 w-4 rtl:rotate-180" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeWidth="2" d="M15 19L8 12l7-7" />
                                </svg>
                            </button>
                            </li>

                            {/* Numbered Buttons */}
                            {[...Array(totalPages)].map((_, index) => (
                            <li key={index}>
                                <button
                                onClick={() => setCurrentPage(index + 1)}
                                className={`flex h-8 items-center justify-center border px-3 leading-tight ${
                                    currentPage === index + 1
                                    ? "z-10 border-primary-300 bg-primary-50 text-primary-600 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                                    : "border-gray-300 bg-white text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                }`}
                                >
                                {index + 1}
                                </button>
                            </li>
                            ))}

                            {/* Next Button */}
                            <li>
                            <button
                                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                                disabled={currentPage === totalPages}
                                className="flex h-8 items-center justify-center rounded-e-lg border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                            >
                                <span className="sr-only">Next</span>
                                <svg className="h-4 w-4 rtl:rotate-180" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeWidth="2" d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                            </li>
                        </ul>
                        </div>

                        {assessmentAnswers.length > 0 && (
                            <>
                                <h3 className="text-xl font-semibold mt-8 mb-4 dark:text-white">Daftar Hasil Assessment</h3>
                                <div className="flow-root sm:mt-8">
                                    <div className="divide-y divide-gray-200 dark:divide-gray-700">
                                    {currentAssessmentAnswers.map((answer) => (
                                            <div key={answer.id} className="flex flex-wrap items-center gap-y-4 py-6">
                                                <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                                                    <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Answer ID:</dt>
                                                    <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                                                        <a href="#" className="hover:underline">{answer.id}</a>
                                                    </dd>
                                                </dl>
                                                <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                                                    <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Emosi:</dt>
                                                    <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">{answer.question_code}</dd>
                                                </dl>
                                                <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                                                    <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Waktu Pembuatan:</dt>
                                                    <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">{new Date(answer.submitted_at).toLocaleString()}</dd>
                                                </dl>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </>
                        )}
                        {assessmentAnswers.length === 0 && !loading && (
                            <p className="mt-4 text-gray-600 dark:text-gray-300">No assessment answers found for this student.</p>
                        )}

                        <div className="mt-6 mb-10 flex items-center justify-center sm:mt-8" aria-label="Assessment pagination">
                        <ul className="flex h-8 items-center -space-x-px text-sm">
                            {/* Prev Button */}
                            <li>
                            <button
                                onClick={() => setCurrentAssessmentPage((p) => Math.max(p - 1, 1))}
                                disabled={currentAssessmentPage === 1}
                                className="ms-0 flex h-8 items-center justify-center rounded-s-lg border border-e-0 border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                            >
                                <span className="sr-only">Previous</span>
                                <svg className="h-4 w-4 rtl:rotate-180" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeWidth="2" d="M15 19L8 12l7-7" />
                                </svg>
                            </button>
                            </li>

                            {/* Numbered Buttons */}
                            {[...Array(totalAssessmentPages)].map((_, index) => (
                            <li key={index}>
                                <button
                                onClick={() => setCurrentAssessmentPage(index + 1)}
                                className={`flex h-8 items-center justify-center border px-3 leading-tight ${
                                    currentAssessmentPage === index + 1
                                    ? "z-10 border-primary-300 bg-primary-50 text-primary-600 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                                    : "border-gray-300 bg-white text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                }`}
                                >
                                {index + 1}
                                </button>
                            </li>
                            ))}

                            {/* Next Button */}
                            <li>
                            <button
                                onClick={() => setCurrentAssessmentPage((p) => Math.min(p + 1, totalAssessmentPages))}
                                disabled={currentAssessmentPage === totalAssessmentPages}
                                className="flex h-8 items-center justify-center rounded-e-lg border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                            >
                                <span className="sr-only">Next</span>
                                <svg className="h-4 w-4 rtl:rotate-180" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeWidth="2" d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                            </li>
                        </ul>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}