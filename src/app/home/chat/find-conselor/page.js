"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
// import Leftbar from '../../components/leftbar';
// import Topbar from '../../components/topbar';
import { useRouter } from "next/navigation";
import { getStudentId } from "@/app/utils/auth/auth";


export default function FindConselor() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const studentId = getStudentId();
  const [counselors, setCounselors] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  const handleSelect = (scheduleId) => {
    router.push(`/home/bookings/create-booking?student_id=${studentId}&schedule_id=${scheduleId}`);
  };

  useEffect(() => {
    if (!token) return;

    const fetchData = async () => {
      try {
        const usersRes = await axios.get('https://sejiwa.onrender.com/api/users', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        const allUsers = usersRes.data || [];

        // Filter hanya konselor yang bisa difetch
        const counselorUsers = allUsers.filter(user => user.role === 'konselor');

        // Fetch semua jadwal
        const scheduleRes = await axios.get('https://sejiwa.onrender.com/api/schedules', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        const allSchedules = scheduleRes.data || [];

        // Melampirkan Konselor yang cocok dengan Jadwal
        const combined = counselorUsers.map(counselor => {
          const counselorSchedules = allSchedules.filter(
            schedule => schedule.counselor_id === counselor.id
          );
          return {
            ...counselor,
            schedule: counselorSchedules,
          };
        });

        setCounselors(combined);
      } catch (err) {
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchParams]);

  if (loading) return <p className="p-4">Loading...</p>;
  return (
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
      {/* Main content */}
      <main className="flex-1 p-6 bg-gray-100 dark:bg-gray-900 text-black dark:text-white">
        {/* <Topbar /> */}
        <h1 className="text-2xl font-bold">Available Konselor</h1>
        {/* Add your content here */}
        <div className="max-w-[85rem] px-4 sm:px-6 lg:px-8 py-12 lg:py-24 mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {counselors.map((counselor) => (
              <div key={counselor.id} className="group flex flex-col">
                <div className="relative">
                  <div className="aspect-4/4 overflow-hidden rounded-2xl">
                    <img
                      className="size-full object-cover rounded-2xl"
                      src="/profile/profile-1.jpg"
                      alt="Profile"
                    />
                  </div>

                  <div className="pt-4">
                    <h3 className="font-medium md:text-lg text-black dark:text-white">
                      {counselor.username}
                    </h3>
                    <p className="mt-2 font-semibold text-black dark:text-white">
                      {counselor.email}
                    </p>
                  </div>

                  <a href="#" className="after:absolute after:inset-0 after:z-1"></a>
                </div>

                <div className="mb-2 mt-4 text-sm">
                  {counselor.schedule.length > 0 ? (
                    <div className="flex flex-col">
                      {counselor.schedule.map((item, index) => (
                        <div key={item.id}>
                          <div
                            className="py-3 border-t border-gray-200 dark:border-neutral-700 cursor-pointer hover:underline"
                          >
                            <div className="grid grid-cols-2 gap-2">
                              <span className="font-medium text-black dark:text-white">Schedule Time:</span>
                              <span className="text-end text-black dark:text-white">{item.date}</span>
                            </div>
                          </div>

                          <div className="py-3 border-t border-gray-200 dark:border-neutral-700">
                            <div className="grid grid-cols-2 gap-2">
                              <span className="font-medium text-black dark:text-white">Waktu:</span>
                              <span className="flex justify-end text-black dark:text-white">{item.time}</span>
                            </div>
                          </div>

                          <div className="py-3 border-t border-gray-200 dark:border-neutral-700">
                            <div className="grid grid-cols-2 gap-2">
                              <span className="font-medium text-black dark:text-white">Is Available:</span>
                                {item.is_available === true || item.is_available === "true" ? (
                                  <span className="text-end text-black dark:text-white">Ada</span>
                                ) : (
                                  <span className="text-end text-black dark:text-white">Tidak Tersedia Sekarang</span>
                                )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">No schedule available</p>
                  )}
                </div>
                {counselor.schedule.map((item) => (
                  <div
                    className="py-2 px-3 w-full inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-xl border border-transparent bg-yellow-400 text-black hover:bg-yellow-500 focus:outline-none focus:bg-yellow-500 transition disabled:opacity-50 disabled:pointer-events-none"
                    key={item.id}
                    onClick={() => handleSelect(item.id)}
                  >
                    Booking Sekarang
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}