'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';

export default function BookingHome() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showDone, setShowDone] = useState(false);
  const [doneMessage, setDoneMessage] = useState('');
  const [rejectedMessage, setRejectedMessage] = useState('');
  const [bookings, setBookings] = useState([]);
  const [isClient, setIsClient] = useState(false);
  const [token, setToken] = useState(null);
  const studentId = searchParams.get('student_id');

  const handleSelect = (scheduleId, counselor_id) => {
    router.push(`/home/bookings/create-booking?student_id=${studentId}&schedule_id=${scheduleId}&counselor_id=${counselor_id}`);
  };
  const redirectToSuccessBooking = () => router.push(`/konselor/chat-konselor`);
  const refreshBooking = () => router.push('/konselor/bookings/rejected-booking');

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (role !== 'konselor') {
      router.replace('/unauthorized');
    } else {
      setIsClient(true);
      setToken(storedToken);
    }
  }, [router]);

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

        const bookingsRes = await axios.get('https://sejiwa.onrender.com/api/bookings', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        const users = usersRes.data || [];
        const allBookings = bookingsRes.data || [];
        const pendingBookings = allBookings.filter(b => b.status === 'pending');

        const combinedData = pendingBookings.map(booking => {
          const user = users.find(u => u.id === booking.student_id);
          return {
            ...booking,
            user,
          };
        });

        console.log("iki booking: ")
        console.log(combinedData);

        setBookings(combinedData);
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 10000);

    return () => clearInterval(interval);
  }, [token, searchParams]);

  const handleSubmit = async (bookingId, studentId, scheduleId, status) => {
    if (!token) return;

    const payload = {
      student_id: studentId,
      schedule_id: scheduleId,
      status,
      created_at: new Date(),
    };

    try {
      const res = await axios.put(`https://sejiwa.onrender.com/api/bookings/${bookingId}`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const roomRes = await axios.get("https://sejiwa.onrender.com/api/chats/rooms", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
  
      const rooms = roomRes.data;
      const lastRoom = rooms.at(-1);
  
      if (lastRoom?.id && (res.status === 200 || res.status === 201) & status === 'confirm') {
        localStorage.setItem("activeRoomId", lastRoom.id);
        setDoneMessage('Konsultasi Diterima!');
        redirectToSuccessBooking();
      } else if (status === 'rejected') {
        setRejectedMessage('Konsultasi Ditolak!');
        refreshBooking();
      } else {
        console.error('Unexpected server response.');
      }
    } catch (err) {
      console.error('Booking request failed:', err);
    }
  };

  if (!isClient) return null;

  return (
    <div className="flex-1 h-screen overflow-y-scroll bg-gray-100 dark:bg-gray-900 text-black dark:text-white">
      <div className="p-6 pb-32">
        <h1 className="text-2xl font-bold mb-4">Daftar Booking</h1>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="group flex flex-col h-full bg-white border border-gray-200 shadow-2xs rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70"
            >
              <div className="h-52 flex justify-center items-center bg-gray-600 rounded-t-xl">
                <img
                  className="size-full object-cover rounded-2xl"
                  src={booking.user?.profile_picture || "/profile.png"}
                  alt="Profile"
                />
              </div>
              <div className="p-4 md:p-6">
                <span className="block mb-1 text-xs font-semibold uppercase text-blue-600 dark:text-blue-500">
                  Permintaan Booking
                </span>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-neutral-300 dark:hover:text-white">
                  {booking.user?.username || 'Unknown User'}
                </h3>
                <p className="mt-3 text-gray-500 dark:text-neutral-500">
                  {booking.user?.email || 'No email available'}
                </p>
              </div>
              <div className="mt-auto flex border-t border-gray-200 divide-x divide-gray-200 dark:border-neutral-700 dark:divide-neutral-700">
                <div>
                  <button
                    type="button"
                    className="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-8 py-2.5 text-center m-2"
                    onClick={() => handleSubmit(booking.id, booking.student_id, booking.schedule_id, 'confirm')}
                  >
                    Terima
                  </button>
                </div>
                <div>
                  <button
                    type="button"
                    className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-8 py-2.5 text-center m-2"
                    onClick={() => handleSubmit(booking.id, booking.student_id, booking.schedule_id, 'rejected')}
                  >
                    Tolak
                  </button>
                </div>

                {showDone && (
                  <div>
                    <span className="absolute top-16 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded shadow-lg transition-all">
                      {doneMessage}
                    </span>
                    <span className="absolute top-16 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded shadow-lg transition-all">
                      {rejectedMessage}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
