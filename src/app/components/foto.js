'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import { getStudentId } from '../utils/auth/auth'

export default function UserProfile() {
  const [userPicture, setUserPicture] = useState(null)
  const [loading, setLoading] = useState(true)
  // const token = localStorage.getItem('token')
  const userId = getStudentId();
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  useEffect(() => {
    const fetchUser = async () => {
      if (!token || !userId) {
        console.warn('No token or user ID found. User is not authenticated.');
        return;
      }

      try {
        const res = await axios.get('https://sejiwa.onrender.com/api/users', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        })
        console.log(res.data.profile_picture)
        const userData = res.data.find((u) => u.id === userId);

        if (userData) {
          setUserPicture(userData.profile_picture)
        }
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
    <img src={ userPicture ? userPicture : "/profile.png" } alt="" className="p-0.5 bg-sky-50 dark:bg-sky-50 rounded-full w-10 h-10 object-cover"></img>
  )
}