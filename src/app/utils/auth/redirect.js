'use client'

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"

export default function AuthRedirect() {
  const router = useRouter()
  const pathname = usePathname()
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token && pathname === "/") {
        const role = token ? JSON.parse(atob(token.split('.')[1]))?.role : null
        router.replace(role === 'konselor' ? '/konselor' : '/home')
    } else {
        setChecking(false)
    }
  }, [])

  if (checking && pathname === '/') { return null }
}
