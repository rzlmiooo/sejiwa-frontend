'use client';

import { BellIcon } from '@heroicons/react/24/outline';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { getStudentId } from '../utils/auth/auth';

export default function NotificationBell() {
  const userId = getStudentId();
  const [count, setCount] = useState(0);
  const [open, setOpen] = useState(false);
  const [role, setRole] = useState(null);
  const [token, setToken] = useState(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const savedRole = localStorage.getItem('role');
    const savedToken = localStorage.getItem('token');
    setRole(savedRole);
    setToken(savedToken);
  }, []);

  useEffect(() => {
    if (!token || role !== 'konselor') return;

    const fetchNewBookings = async () => {
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

        setCount(combinedData.length);
      } catch (err) {
        console.error('Gagal ambil booking baru:', err);
      }
    };

    fetchNewBookings();
    const interval = setInterval(fetchNewBookings, 10000);
    return () => clearInterval(interval);
  }, [token, role]);

  if (role === null || token === null) return null;
  if (role !== 'konselor') return null;

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    setOpen(true);
    };

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
        setOpen(false);
        }, 150);
    };

    return (
        <div
        className="relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        >
        <div className="cursor-pointer">
            <BellIcon className="h-7 w-7 text-sky-50" />
            {count > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {count}
            </span>
            )}
        </div>

        {open && (
            <div className="absolute right-0 mt-2 w-56 rounded-lg bg-white dark:bg-gray-800 shadow-xl z-50 p-4 text-sm">
            {count > 0 ? (
                <>
                <p className="mb-2 font-medium">{count} Booking terbaru</p>
                <Link
                    href="/konselor/bookings"
                    className="text-sky-500 hover:underline"
                >
                    Pergi ke Booking
                </Link>
                </>
            ) : (
                <>
                <p className="mb-2 text-gray-500">Belum ada Booking</p>
                <span className="text-gray-400 cursor-not-allowed">
                    Pergi ke Booking
                </span>
                </>
            )}
            </div>
        )}
        </div>
    );
}
