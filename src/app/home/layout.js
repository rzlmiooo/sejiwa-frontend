'use client'

import Sidebar from "../components/sidebar"
import Navbar from "../components/navbar"
import { useState } from "react"
import { Rubik } from "next/font/google"

const rubik = Rubik({
    subsets: ['latin'],
    weight: ['400', '500', '700'],
    variable: '--font-rubik',
    display: 'swap'
})

export default function Homepage({ children }){
    const [isSidebarOpen, setSidebarOpen] = useState(false)

    const toggleSidebar = () => setSidebarOpen(!isSidebarOpen)

    return (
        <div className={`${rubik.className} font-sans h-screen flex flex-col bg-sky-50 dark:bg-gray-900 overflow-hidden`}>
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