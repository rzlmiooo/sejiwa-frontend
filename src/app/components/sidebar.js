'use client'

import { useState } from 'react';
import Link from 'next/link'
import { AuthService } from '../service/AuthService';
import Image from 'next/image';

const navigation = [
    {src: '/dashboard.png', alt: "icon", name: 'Beranda', href: '/home' },
    {src: '/assessment.png', alt: "icon", name: 'Assessment', href: '/home/assessment' },
    {src: '/like.png', alt: "icon", name: 'Rekomendasi', href: '/home/recommendation' },
    {src: '/chat.png', alt: "icon", name: 'Chat Konselor', href: '/home/chat' },
    {src: '/settings.png', alt: "icon", name: 'Pengaturan', href: '/home/settings' }
]

export default function Sidebar({ isOpen }) {
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
                    <Image src={item.src} alt={item.alt} width={50} height={50} className='size-5 invert dark:invert-0'></Image>{ isOpen && <h1 className="p-0 text-sm font-bold text-sky-900 dark:text-sky-50">{item.name}</h1> }
                </Link>
            ))}
        </div>
    )
}