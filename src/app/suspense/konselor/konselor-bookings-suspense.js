'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { getStudentId } from '@/app/utils/auth/auth';

export default function BookingHome() {
  const router = useRouter();
  const [showDone, setShowDone] = useState(false);
  const [doneMessage, setDoneMessage] = useState('');
  const [rejectedMessage, setRejectedMessage] = useState('');
  const [bookings, setBookings] = useState([]);
  const [isClient, setIsClient] = useState(false);
  const [token, setToken] = useState(null);
  const userId = getStudentId();
  const [loading, setLoading] = useState(false);

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
        const [usersRes, bookingsRes] = await Promise.all([
          axios.get('https://sejiwa.onrender.com/api/users', {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }),
          axios.get('https://sejiwa.onrender.com/api/bookings', {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }),
        ]);
  
        const users = usersRes.data || [];
        const allBookings = bookingsRes.data || [];
  
        if (!userId) return;
  
        const pendingBookings = allBookings.filter(
          (b) =>
            b.status === "pending" &&
            b.counselor_id === userId
        );
  
        const combinedData = pendingBookings.map((booking) => {
          const user = users.find((u) => u.id === booking.student_id);
          return {
            ...booking,
            user,
          };
        });
  
        console.log("Booking (combined):", combinedData);
        setBookings(combinedData);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
  
    fetchData();
    const interval = setInterval(fetchData, 10000);
  
    return () => clearInterval(interval);
  }, [token]);
  

  const handleSubmit = async (bookingId, studentId, counselorId, scheduleId, status) => {
    if (!token || loading) return; // cegah spam click

    setLoading(true); // ⏳ mulai loading

    const payload = {
      schedule_id: scheduleId,
      student_id: studentId,
      counselor_id: counselorId,
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
  
      if (status === 'confirm' && (res.status === 200 || res.status === 201)) {
        const roomRes = await axios.get("https://sejiwa.onrender.com/api/chats/rooms", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        const rooms = roomRes.data || [];
        const roomUser = rooms
          .filter((room) => room.counselor_id === userId)
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at)); // ⬅️ ASCENDING
        
        const lastRoom = roomUser.at(-1);

        if (lastRoom?.id) {
          localStorage.setItem("activeRoomId", lastRoom.id);
          setDoneMessage("Konsultasi Diterima!");
          redirectToSuccessBooking();
        } else {
          console.error("Room tidak ditemukan.");
        }
      } else if (status === 'rejected') {
        setRejectedMessage("Konsultasi Ditolak!");
        refreshBooking();
      } else {
        console.error("Unexpected server response.");
      }
    } catch (err) {
      console.error("Booking request failed:", err);
    } finally {
      setLoading(false);
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
                    disabled={loading}
                    className={`text-sky-50 font-medium rounded-lg text-sm px-8 py-2.5 text-center m-2${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'}`}
                    onClick={() => handleSubmit(booking.id, booking.student_id, booking.counselor_id, booking.schedule_id, 'confirm')}
                  >
                    {loading ? 'Loading...' : 'Terima'}
                  </button>
                </div>
                <div>
                  <button
                    type="button"
                    disabled={loading}
                    className={`text-sky-50 font-medium rounded-lg text-sm px-8 py-2.5 text-center m-2${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700'}`}
                    onClick={() => handleSubmit(booking.id, booking.student_id, booking.counselor_id, booking.schedule_id, 'rejected')}
                  >
                    {loading ? 'Loading...' : 'Tolak'}
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
