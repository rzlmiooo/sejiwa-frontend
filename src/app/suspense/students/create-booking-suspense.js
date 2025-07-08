"use client";

import axios from 'axios';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from 'next/navigation';

export default function CreateBooking() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const studentId = searchParams.get('student_id');
    const scheduleId = searchParams.get('schedule_id');
    const counselorId = searchParams.get('counselor_id');

    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

    const redirectToSuccessBooking = () => {
        router.push(`/home/chat/chat-pelajar/?student_id=${studentId}`);
        // router.push("/home/chat/booking/success-booking")
    };

    const [formData, setFormData] = useState({
        student_id: studentId,
        schedule_id: scheduleId,
        status: "pending",
        created_at: new Date(),
        successMessage: null,
        errorMessage: null
    });

    const [state, setState] = useState("");

    const handleSubmitClick = async (e) => {
        if (!token) return;
        e.preventDefault();
        setError("");
        const payload = {
            student_id: studentId,
            schedule_id: scheduleId,
            counselor_id: counselorId,
            status: "pending",
            created_at: new Date(),
        }

        try {
            const bookingsRes = await axios.post('https://sejiwa.onrender.com/api/bookings', payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (bookingsRes.status === 200 || bookingsRes.status === 201) {
                setState((prevState) => ({
                    ...prevState,
                    successMessage: "Booking sukses. Redirecting ke halaman Chat...",
                    errorMessage: null,
                }));
                redirectToSuccessBooking();
            } else {
                setState((prev) => ({
                    ...prev,
                    errorMessage: "Koneksi Buruk.",
                }));
            }
            return redirectToSuccessBooking();
        } catch (error) {
            console.error("Booking request failed:", error);
            setState((prev) => ({
                ...prev,
                errorMessage: "Booking gagal. Cek koneksi internet Anda.",
            }));
        }
    };


    return (
        <div className="flex-1 p-6 bg-gray-100 dark:bg-gray-900 text-black dark:text-white">
            {/* Add your content here */}
            <div class="max-w-4xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
                <div class="bg-white rounded-xl shadow-xs p-4 sm:p-7 dark:bg-neutral-900">
                    <form>
                        <div class="grid sm:grid-cols-12 gap-2 sm:gap-4 py-8 first:pt-0 last:pb-0 border-t first:border-transparent border-gray-200 dark:border-neutral-700 dark:first:border-transparent">
                            <div class="sm:col-span-12">
                                <h2 class="text-lg font-semibold text-gray-800 dark:text-neutral-200">
                                    Yakin Booking Konselor?
                                </h2>
                            </div>

                        </div>

                        <div class="py-8 first:pt-0 last:pb-0 border-t first:border-transparent border-gray-200 dark:border-neutral-700 dark:first:border-transparent">
                            <h2 class="text-lg font-semibold text-gray-800 dark:text-neutral-200">
                                Penting!
                            </h2>
                            <p class="mt-3 text-sm text-gray-600 dark:text-neutral-400">
                                Respon yang Anda kirimkan akan kami gunakan untuk pengembangan Sejiwa App kedepannya. 
                            </p>
                            <p class="mt-2 text-sm text-gray-600 dark:text-neutral-400">
                                Setuju / Tidak
                            </p>

                            <div class="mt-5 flex">
                                <input type="checkbox" class="shrink-0 mt-0.5 border-gray-300 rounded-sm text-blue-600 checked:border-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-600 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" id="af-submit-application-privacy-check" />
                                <label for="af-submit-application-privacy-check" class="text-sm text-gray-500 ms-2 dark:text-neutral-400">Allow us to process your personal information.</label>
                            </div>
                        </div>

                        <button
                            type="button"
                            class="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-hidden focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                            onClick={handleSubmitClick}
                        >
                            Book
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}