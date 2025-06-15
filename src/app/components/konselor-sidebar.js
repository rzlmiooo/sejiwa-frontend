'use client'
import { useState } from 'react';
import { AuthService } from '../service/AuthService';
import { ArrowLeftStartOnRectangleIcon } from '@heroicons/react/24/solid';
import Link from 'next/link'

const navigation = [
    {src: '/dashboard.png', name: 'Dashboard', href: '/konselor' },
    {src: '/booking.png', name: 'Booking', href: '/konselor/bookings' },
    {src: '/chat.png', name: 'Chat', href: '/konselor/chat-konselor' },
    {src: '/edit.png', name: 'Kelola Jadwal', href: '/konselor/kelola-jadwal' },
    {src: '/history.png', name: 'Riwayat Konsultasi', href: '/konselor/riwayat-konsultasi' },
    {src: '/profile.png', name: 'Profil', href: '/konselor/profile' }
]

export default function KonselorSidebar({ isOpen }) {
    const [error, setError] = useState("");
    
    const logout = async (e) => {
        e.preventDefault();
        setError("");
        try {
            await AuthService.logout(); 
            console.log("Logout Successful");
            await router.push("/"); 
        } catch (err) {
            console.error("Logout error:", err?.response?.data || err.message);
            setError(err?.response?.data?.message || "Logout failed");
        }
    }

    return (
        <div className={
            `p-1 bg-sky-50 dark:bg-gray-900 border-r-1 border-sky-600 transition-all duration-300 z-50 
            ${ isOpen ? 'w-72' : 'w-18' }` 
        }
        >
            {navigation.map((item) => (
                <Link key={item.name} href={item.href} className="mx-5 my-8 flex flex-row items-center gap-5 hover:scale-102">
                    <img src={item.src} className='size-5 invert dark:invert-0'></img>{ isOpen && <h1 className="p-0 text-sm font-bold text-sky-900 dark:text-sky-50">{item.name}</h1> }
                </Link>
            ))}
            <Link onClick={logout} href="" className="mx-5 my-8 flex flex-row items-center gap-4 hover:scale-102">
                <ArrowLeftStartOnRectangleIcon className='size-6 invert dark:invert-0'/>
                { isOpen && <h1 className="p-0 text-sm font-bold text-sky-900 dark:text-sky-50">Keluar</h1> }
            </Link>
        </div>
    )
}