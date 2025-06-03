'use client'

import { useEffect, useState } from 'react'

export default function UserGreeting() {
    const [username, setUsername] = useState('')
    const [loading, setLoading] = useState(true)
  
    useEffect(() => {
      const fetchUser = async () => {
        try {
          // Ambil token dari localStorage
          const token = localStorage.getItem('token')
          if (!token) {
            throw new Error('Token not found')
          }
  
          // Fetch data user pakai Authorization header
          const res = await fetch('https://sejiwa.onrender.com/api/users', {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          })
  
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`)
          }
  
          const data = await res.json()
          const name = Array.isArray(data) ? data[0]?.username : data.username
  
          setUsername(name || 'User')
        } catch (error) {
          console.error('Error fetching user:', error)
          setUsername('User')
        } finally {
          setLoading(false)
        }
      }
  
      fetchUser()
    }, [])
  
    if (loading) return <p>Loading...</p>

  return username
}
