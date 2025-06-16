'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function UnauthorizedPage() {
    const router = useRouter()
    const [countdown, setCountdown] = useState(5)

    useEffect(() => {
        // Turunin angka tiap detik
        const interval = setInterval(() => {
          setCountdown((prev) => prev - 1)
        }, 1000)
    
        // Setelah 3 detik redirect
        const timeout = setTimeout(() => {
          router.push('/login')
        }, 5100)
    
        return () => {
          clearInterval(interval)
          clearTimeout(timeout)
        }
    }, [router])

    return (
        <div className="flex flex-col m-20 p-5 justify-center items-center">
            Anda tidak memiliki akses konselor. Login dengan akun konselor untuk masuk laman Konselor
            <p className="text-lg">Kamu akan diarahkan ke halaman login dalam</p>
            <p className="text-5xl font-mono mt-2 animate-pulse">{countdown}</p>
        </div>
    )
}