'use client'

import Sidebar from "../components/sidebar"
import Navbar from "../components/navbar"
import { useState, useEffect } from "react"
import localFont from "next/font/local"
import { useRouter } from "next/navigation"
import { Toaster } from "react-hot-toast"

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

export default function Homepage({ children }){
    const [isSidebarOpen, setSidebarOpen] = useState(false)

    const toggleSidebar = () => setSidebarOpen(!isSidebarOpen)

    const router = useRouter()
    
    const [authorized, setAuthorized] = useState(false)

    useEffect(() => {
      const token = localStorage.getItem('token') // atau pakai js-cookie

      if (!token) {
        router.replace('/unauthorized')
      } else {
        setAuthorized(true)
      }
    }, [router])

    if (!authorized) return <p>Loading...</p>

    return (
        <div className={`${rubik.className} font-sans h-screen flex flex-col bg-sky-50 dark:bg-gray-900 overflow-hidden`}>
            {/* header */}
            <Navbar toggleSidebar={toggleSidebar} />
            <div className="h-screen flex flex-row">
                {/* sidebar */}
                <Sidebar isOpen={isSidebarOpen} />
                {children}
                <Toaster position="top-center" />
            </div>
        </div>
    )
}