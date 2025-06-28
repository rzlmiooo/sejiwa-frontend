'use client';

import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { getStudentId } from "@/app/utils/auth/auth";

export default function UpdateJadwal() {
    const router = useRouter();
    const counselorId = getStudentId();

    const [startDate, setStartDate] = useState(null);
    const [state, setState] = useState({
        time: "",
        is_available: "true", 
        successMessage: null,
        errorMessage: null
    });

    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

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
            const res = await axios.put('https://sejiwa.onrender.com/api/schedules', payload, {
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
        <div className="flex-1 h-screen p-6 bg-gray-100 dark:bg-gray-900 text-black dark:text-white">
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-4">Kelola Jadwal</h1>

                <form onSubmit={handleSubmitClick} className="max-w-md mx-auto space-y-4">
                    <div className="flex flex-col">
                        <label className="mb-1 font-medium">Tanggal Konseling</label>
                        <DatePicker
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            placeholderText="Select date"
                            className="p-2 border rounded"
                            dateFormat="yyyy-MM-dd"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="time" className="block mb-1 text-sm font-medium">Jam Konseling</label>
                        <input
                            type="time"
                            id="time"
                            name="time"
                            value={state.time}
                            onChange={handleChange}
                            min="09:00"
                            max="18:00"
                            required
                            className="bg-gray-50 dark:bg-gray-900 border border-gray-300 text-sm rounded-lg block w-full p-2.5"
                        />
                    </div>

                    <div>
                        <label htmlFor="is_available" className="block mb-1 text-sm font-medium">Ketersediaan</label>
                        <select
                            id="is_available"
                            name="is_available"
                            value={state.is_available}
                            onChange={handleChange}
                            className="bg-gray-50 dark:bg-gray-900 border border-gray-300 text-sm rounded-lg block w-full p-2.5"
                        >
                            <option value="true">Ada</option>
                            <option value="false">Tidak Ada</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Simpan Jadwal
                    </button>

                    {state.successMessage && <p className="text-green-500">{state.successMessage}</p>}
                    {state.errorMessage && <p className="text-red-500">{state.errorMessage}</p>}
                </form>
            </div>
        </div>
    );
}
