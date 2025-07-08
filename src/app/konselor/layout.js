'use client'

import KonselorSidebar from "../components/konselor-sidebar"
import Navbar from "../components/navbar"
import { useState } from "react"
import localFont from "next/font/local"

const rubik = localFont({
    src: [
        {
            path: '../fonts/Rubik/rubik-v30-latin-300.woff2',
            weight: '300',
            style: 'normal',
        },
        {
          path: '../fonts/Rubik/rubik-v30-latin-500.woff2',
          weight: '500',
          style: 'normal',
        },
        {
          path: '../fonts/Rubik/rubik-v30-latin-700.woff2',
          weight: '700',
          style: 'normal',
        },
        {
          path: '../fonts/Rubik/rubik-v30-latin-regular.woff2',
          weight: '400',
          style: 'normal',
        }
    ],
    display: 'swap'
})
  

export default function RootLayout({ children }){
    const [isSidebarOpen, setSidebarOpen] = useState(false)

    const toggleSidebar = () => setSidebarOpen(!isSidebarOpen)

    return (
        <div className={`${rubik.className} font-sans h-screen flex flex-col bg-sky-50 dark:bg-gray-900 overflow-hidden`}>
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