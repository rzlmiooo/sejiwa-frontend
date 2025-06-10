'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Topbar from '../../components/topbar';
import Chart from '../../components/chart';
import Leftbar from '../../components/leftbarKonselor';

export default function KelolaJadwal() {
    const router = useRouter();
    const searchParams = useSearchParams();
   
    return (
        <div className="flex h-screen">
            <div className="flex h-screen">
                {/* Sidebar toggle button for small screens */}
                <button
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
                </button>

                {/* Sidebar */}
                <Leftbar />
                <main className="flex-1 p-6 bg-gray-100 dark:bg-gray-900 text-black dark:text-white">
                    <Topbar />
                    <div className="p-6">
                        <h1 className="text-2xl font-bold mb-4">Consultations</h1>
                    </div>
                </main>
            </div>
        </div>
    );
}
