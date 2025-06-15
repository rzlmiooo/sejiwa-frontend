'use client';

import { useRouter, useSearchParams } from 'next/navigation';

export default function Consultations() {
    const router = useRouter();
    const searchParams = useSearchParams();
   
    return (
        <div className="flex h-screen">
            <div className="flex h-screen">
                <main className="flex-1 p-6 bg-gray-100 dark:bg-gray-900 text-black dark:text-white">
                    <div className="p-6">
                        <h1 className="text-2xl font-bold mb-4">Consultations</h1>
                    </div>
                </main>
            </div>
        </div>
    );
}
