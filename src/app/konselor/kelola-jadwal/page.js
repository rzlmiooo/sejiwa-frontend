'use client';

import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getStudentId } from "../../utils/auth/auth";
import 'react-datepicker/dist/react-datepicker.css';

export default function KelolaJadwal() {
    const router = useRouter();
    const counselorId = getStudentId();
    const [schedule, setScheduleData] = useState([]);

    const redirectToCreateSchedule = () => router.push('/konselor/kelola-jadwal/create-jadwal');
    const redirectToUpdateSchedule = () => router.push('/konselor/kelola-jadwal/update-jadwal');

    const [startDate, setStartDate] = useState(null);
    const [state, setState] = useState({
        time: "",
        is_available: "true",
        successMessage: null,
        errorMessage: null
    });

    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

    const fetchUserSchedules = async () => {
        try {
            const schedulesRes = await axios.get('https://sejiwa.onrender.com/api/schedules', {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            const allSchedules = schedulesRes.data || [];

            const scheduleUser = allSchedules.filter(
                (schedule) => String(schedule.counselor_id) === String(counselorId)
            );

            setScheduleData(scheduleUser);
        } catch (err) {
            console.error('Error fetching schedules:', err);
        } finally {
            setLoading(false);
        }
    };


    const handleChange = (e) => {
        const { name, value } = e.target;
        setState((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmitClick = async (e) => {
        e.preventDefault();
        if (!token) return;

        const payload = {
            date: startDate,
            time: state.time,
            is_available: state.is_available,
            counselor_id: counselorId,
        };

        try {
            const res = await axios.post('https://sejiwa.onrender.com/api/schedules', payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (res.status === 200) {
                setState((prev) => ({
                    ...prev,
                    successMessage: "Schedule successfully saved!",
                    errorMessage: null,
                }));
            }
        } catch (error) {
            setState((prev) => ({
                ...prev,
                errorMessage: "Failed to save schedule.",
            }));
        }
    };

    return (
        <div className="flex h-screen">
            <main className="flex-1 p-6 bg-gray-100 dark:bg-gray-900 text-black dark:text-white">
                <div className="p-6">
                    <h1 className="text-2xl font-bold mb-4">Kelola Jadwal</h1>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {schedule.map((schedule) => (
                        <div
                            key={schedule.id}
                            className="group flex flex-col h-full bg-white border border-gray-200 shadow-2xs rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70"
                        >
                            <div className="h-52 flex justify-center items-center bg-gray-600 rounded-t-xl">
                                <img
                                    className="size-full object-cover rounded-2xl"
                                    src="/profile/profile-2.jpg"
                                    alt="Profile"
                                />
                            </div>
                            <div className="p-4 md:p-6">
                                <span className="block mb-1 text-xs font-semibold uppercase text-blue-600 dark:text-blue-500">
                                    Schedule Request
                                </span>
                                <h3 className="text-xl font-semibold text-gray-800 dark:text-neutral-300 dark:hover:text-white">
                                    {schedule.date}
                                </h3>
                                <p className="mt-3 text-gray-500 dark:text-neutral-500">
                                    {booking.time}
                                </p>
                                 <p className="mt-3 text-gray-500 dark:text-neutral-500">
                                    {booking.is_available}
                                </p>
                            </div>
                            <div className="mt-auto flex border-t border-gray-200 divide-x divide-gray-200 dark:border-neutral-700 dark:divide-neutral-700">
                                <div>
                                    <button
                                        type="button"
                                        className="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-8 py-2.5 text-center m-2"
                                        onClick={redirectToCreateSchedule}
                                    >
                                        Buat Jadwal
                                    </button>
                                </div>
                                <div>
                                    <button
                                        type="button"
                                        className="text-blue-700 hover:text-white border border-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-8 py-2.5 text-center m-2"
                                        onClick={redirectToUpdateSchedule}
                                    >
                                        Ubah Jadwal
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                    </div>
                </div>
            </main >
        </div >
    );
}
