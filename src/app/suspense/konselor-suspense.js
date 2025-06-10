'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
// import Topbar from '@/app/components/topbar';
// import Chart from '@/app/components/chart';
// import Leftbar from '@/app/components/leftbarKonselor';

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
        <div className="flex h-screen">
            <div className="flex h-screen">
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
                {/* <Leftbar /> */}
                <main className="flex-1 p-6 bg-gray-100 dark:bg-gray-900 text-black dark:text-white">
                    {/* <Topbar /> */}
                    <div className="p-6">
                        <h1 className="text-2xl font-bold mb-4">Analytics Dashboard</h1>

                        <div className="grid grid-cols-3 gap-4 mb-8">
                            {totalUsers && (
                                <div className="p-4 bg-white shadow rounded">
                                    Total Users: {totalUsers.total_users}
                                </div>
                            )}
                            {totalSchedules && (
                                <div className="p-4 bg-white shadow rounded">
                                    Total Counselors: {totalSchedules.total_schedules}
                                </div>
                            )}
                            {totalAssessments && (
                                <div className="p-4 bg-white shadow rounded">
                                    Total Assessments: {totalAssessments.total_assessments}
                                </div>
                            )}

                            <Chart />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
