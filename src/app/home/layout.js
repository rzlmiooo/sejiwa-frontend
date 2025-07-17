'use client'

import Sidebar from "../components/sidebar"
import Navbar from "../components/navbar"
import { useState, useEffect } from "react"
import localFont from "next/font/local"
import { useRouter } from "next/navigation"
import { Toaster, toast } from "react-hot-toast"
import { AuthService } from "../service/AuthService"

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
    const router = useRouter();
    const [authorized, setAuthorized] = useState(false);
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

    useEffect(() => {
      const checkToken = () => {
        const token = localStorage.getItem('token');
        if (!token) {
          router.replace('/unauthorized');
          return;
        }
    
        try {
          const payload  = JSON.parse(atob(token.split('.')[1]));
          const expired  = payload.exp * 1000 < Date.now();
    
          if (expired) {
            toast.error('Sesi Anda telah berakhir. Silakan login ulang.');
            AuthService.logout();
          } else {
            setAuthorized(true);
          }
        } catch (err) {
          console.error('Invalid token :', err);
          AuthService.logout();
        }
      };
    
      checkToken();
    
      const interval = setInterval(checkToken, 5000);
    
      return () => clearInterval(interval);
    }, [router]);
    

    if (!authorized) return <p>Loading...</p>

    return (
        <div className={`${rubik.className} font-sans h-screen flex flex-col bg-sky-50 dark:bg-gray-900 overflow-hidden`}>
            {/* header */}
            <Navbar toggleSidebar={toggleSidebar} />
            <div className="flex flex-1 overflow-y-auto">
                {/* sidebar */}
                <Sidebar isOpen={isSidebarOpen} />
                {children}
                <Toaster position="top-center" />
            </div>
        </div>
    )
}