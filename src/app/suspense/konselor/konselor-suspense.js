'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Chart from '@/app/components/chart';
import UserGreeting from '@/app/components/greetings';

export default function Dashboard() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isClient, setIsClient] = useState(false);
    const [token, setToken] = useState(null);
    const [totalUsers, setTotalUsers] = useState(null);
    const [totalSchedules, setTotalSchedules] = useState(null);
    const [totalAssessments, setTotalAssessments] = useState(null);

    useEffect(() => {
        setIsClient(true);
        const storedToken = localStorage.getItem('token');
        const role = localStorage.getItem('role');
        if (role !== 'konselor') {
            router.replace('/unauthorized');
        }
        setToken(storedToken);
    }, [router]);

    useEffect(() => {
        if (!token) return;

        const fetchData = async () => {
            try {
                const [usersRes, schedulesRes, assessmentsRes, chartsRes] = await Promise.all([
                    axios.get('https://sejiwa.onrender.com/api/analytics/totalUsers', {
                        headers: { Authorization: `Bearer ${token}` }
                    }),
                    axios.get('https://sejiwa.onrender.com/api/analytics/totalSchedules', {
                        headers: { Authorization: `Bearer ${token}` }
                    }),
                    axios.get('https://sejiwa.onrender.com/api/analytics/totalAssessments', {
                        headers: { Authorization: `Bearer ${token}` }
                    })
                ]);

                setTotalUsers(usersRes.data[0]);
                setTotalSchedules(schedulesRes.data[0]);
                setTotalAssessments(assessmentsRes.data[0]);
            } catch (error) {
                console.error('Error fetching analytics data:', error);
            }
        };

        fetchData();
    }, [token, searchParams]);

    if (!isClient) return null;

    return (
        <div className="flex-1 w-full h-screen">
            <main className="flex flex-col gap-4 p-8 bg-gray-100 dark:bg-gray-900 text-black dark:text-white">
                <h1>Halo, <UserGreeting/>. Selamat datang di halaman Konselor</h1>
                <h1 className="text-2xl font-bold mb-4">Ringkasan Aktivitas Konseling</h1>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                    {totalUsers && (
                        <div className="flex justify-center items-center py-4 bg-sky-50 dark:bg-sky-900 font-semibold text-gray-900 dark:text-sky-50 shadow rounded">
                            Total Pelajar: {totalUsers.total_users}
                        </div>
                    )}
                    {totalSchedules && (
                        <div className="flex justify-center items-center py-4 bg-sky-50 dark:bg-sky-900 font-semibold text-gray-900 dark:text-sky-50 shadow rounded">
                            Total Konselor: {totalSchedules.total_schedules}
                        </div>
                    )}
                    {totalAssessments && (
                        <div className="flex justify-center items-center py-4 bg-sky-50 dark:bg-sky-900 font-semibold text-gray-900 dark:text-sky-50 shadow rounded">
                            Total Asesmen: {totalAssessments.total_assessments}
                        </div>
                    )}
                    <Chart />
                </div>
            </main>
        </div>
    );
}
