'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'

export default function UserProfile() {
  const [userPicture, setUserPicture] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token') // atau pakai Cookies.get()

      if (!token) return // kalau gak ada token, gak usah fetch

      try {
        const res = await axios.get('https://sejiwa.onrender.com/api/users', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        // anggap backend kirim 1 user (user yang sedang login)
        setUserPicture(res.data.profile_picture)
      } catch (error) {
        console.error('Gagal ambil data user:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [])

  if (loading) return <img src="/profile.png"/>

  return (
    <img src={ userPicture ? userPicture : "/profile.png" } alt="" className="p-1 bg-sky-50 dark:bg-sky-50 rounded-full w-10 h-auto"></img>
  )
}