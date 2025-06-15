"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from 'next/navigation';

export default function BookingSchedule() {
  const searchParams = useSearchParams();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  useEffect(() => {
    if (!token) return;

    const fetchData = async () => {
      try {
        const bookingsRes = await axios.get('https://sejiwa.onrender.com/api/bookings', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        const bookings = bookingsRes.data || [];

        return bookings;
      }
      catch (err) {
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    }
    
    fetchData();
  }, [searchParams]);

  return (
    <div className="flex-1 p-6 bg-gray-100 dark:bg-gray-900 text-black dark:text-white">
      <h1 className="text-2xl font-bold">Welcome to your Booking</h1>
      {/* Add your content here */}
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <div className="space-y-6">
          {bookings.map((booking, index) => (
            <div key={index} className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
              <h2 className="text-xl font-semibold">{booking.name}</h2>
              <p className="text-sm mb-1">{booking.email}</p>
              {/* <p className="text-sm mb-3">{counselor.description}</p> */}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}