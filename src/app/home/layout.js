'use client'

import Sidebar from "../components/sidebar"
import Navbar from "../components/navbar"
import { useState } from "react"

const navigation = [
    {src: '/dashboard.png', name: 'Beranda', href: '/home' },
    {src: '/assessment.png', name: 'Assessment', href: '/home/assessment' },
    {src: '/like.png', name: 'Rekomendasi', href: '/home/recommendation' },
    {src: '/chat.png', name: 'Chat Konselor', href: '/home/chat' },
    {src: '/settings.png', name: 'Pengaturan', href: '/home/settings' }
]

export default function Homepage({ children }){
    const [isSidebarOpen, setSidebarOpen] = useState(false)

    const toggleSidebar = () => setSidebarOpen(!isSidebarOpen)

    return (
        <div className="h-screen flex flex-col bg-sky-50 dark:bg-gray-900 overflow-hidden">
            {/* header */}
            <Navbar toggleSidebar={toggleSidebar} />
            <div className="h-screen flex flex-row">
                {/* sidebar */}
                <Sidebar isOpen={isSidebarOpen} />
                {children}
            </div>
        </div>
    )
}