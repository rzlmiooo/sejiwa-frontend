'use client'

import KonselorSidebar from "../components/konselor-sidebar"
import Navbar from "../components/navbar"
import { useState } from "react"

export default function Konselor({ children }){
    const [isSidebarOpen, setSidebarOpen] = useState(false)

    const toggleSidebar = () => setSidebarOpen(!isSidebarOpen)

    return (
        <div className="h-screen flex flex-col bg-sky-50 dark:bg-gray-900 overflow-hidden">
            {/* header */}
            <Navbar toggleSidebar={toggleSidebar} />
            <div className="h-screen flex flex-row">
                {/* sidebar */}
                <KonselorSidebar isOpen={isSidebarOpen} />
                {children}
            </div>
        </div>
    )
}