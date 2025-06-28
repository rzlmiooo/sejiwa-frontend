// import Back from "@/app/components/back";

// export default function Profile() {
//   return (
//     <div className="flex h-screen">
//       <main className="flex-1 p-6 bg-gray-100 dark:bg-gray-900 text-black dark:text-white">
//         <Back />
//         <h1 className="text-2xl font-bold">Welcome to your profile</h1>
//       </main>
//     </div>
//   );
// }

// 'use client'

// import { useEffect, useState } from 'react'
// import axios from 'axios'

// export default function ProfilePage() {
//   const [user, setUser] = useState(null)
//   const [form, setForm] = useState({ username: '', bio: '' })
//   const [selectedFile, setSelectedFile] = useState(null)
//   const [preview, setPreview] = useState(null)

//   useEffect(() => {
//     const fetchUser = async () => {
//       const token = localStorage.getItem('token')

//       const res = await axios.get('https://sejiwa.onrender.com/api/users', {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })

//       setUser(res.data)
//       setForm({ username: res.data.username, bio: res.data.bio || '' })
//     }

//     fetchUser()
//   }, [])

//   const handleInputChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value })
//   }

//   const handleFileChange = (e) => {
//     const file = e.target.files[0]
//     setSelectedFile(file)
//     setPreview(URL.createObjectURL(file))
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()

//     const token = localStorage.getItem('token')
//     const formData = new FormData()
//     formData.append('username', form.username)
//     formData.append('bio', form.bio)
//     if (selectedFile) {
//       formData.append('profile_picture', selectedFile)
//     }

//     await axios.put('https://sejiwa.onrender.com/api/users', formData, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         'Content-Type': 'multipart/form-data',
//       },
//     })

//     alert('Profil berhasil diperbarui!')
//   }

//   if (!user) return <p className="text-center mt-10">Loading...</p>

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto p-8"
//     >
//       {/* Kiri: Foto Profil */}
//       <div className="flex flex-col items-center gap-4">
//         <img
//           src={preview || user.profile_picture || '/profile.png'}
//           alt="Foto Profil"
//           className="w-64 h-64 rounded-full object-cover border-4 border-gray-300"
//         />
//         <input
//           type="file"
//           accept="image/*"
//           onChange={handleFileChange}
//           className="text-sm"
//         />
//       </div>

//       {/* Kanan: Form Input */}
//       <div className="space-y-4">
//         <div>
//           <label className="block text-sm font-semibold mb-1">Username</label>
//           <input
//             type="text"
//             name="username"
//             value={form.username}
//             onChange={handleInputChange}
//             className="w-full border rounded px-3 py-2"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-semibold mb-1">Bio</label>
//           <textarea
//             name="bio"
//             value={form.bio}
//             onChange={handleInputChange}
//             rows={4}
//             className="w-full border rounded px-3 py-2"
//           />
//         </div>

//         <button
//           type="submit"
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//         >
//           Simpan Perubahan
//         </button>
//       </div>
//     </form>
//   )
// }

'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'

export default function ProfilePage() {
  const [user, setUser] = useState(null)
  const [form, setForm] = useState({ username: '', email: '' })
  const [selectedFile, setSelectedFile] = useState(null)
  const [preview, setPreview] = useState(null)
  
  const token = localStorage.getItem('token')
  const decoded = jwtDecode(token)
  const userId = decoded.sub || decoded.id // tergantung backend lo kasih apa
  
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token')

      const res = await axios.get('https://sejiwa.onrender.com/api/users', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })

      const userData = res.data.find(u => u.id === userId)

      setUser(userData)
      setForm({
        username: userData.username,
        email: userData.email,
      })

      console.log(res.data)
    }

    fetchUser()
  }, [])

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    setSelectedFile(file)
    setPreview(URL.createObjectURL(file))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const token = localStorage.getItem('token')
    const formData = new FormData()
    formData.append('username', form.username)
    formData.append('email', form.email)
    if (selectedFile) {
      formData.append('profile_picture', selectedFile)
    }

    await axios.put(`https://sejiwa.onrender.com/api/users?id=${userId}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    })

    alert('Profil berhasil diperbarui!')
  }

  const handleDelete = async () => {
    const konfirmasi = confirm('Yakin ingin menghapus akun? Ini permanen bro!')
    if (!konfirmasi) return

    const token = localStorage.getItem('token')

    await axios.delete(`https://sejiwa.onrender.com/api/users?${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    alert('Akun lo udah dihapus 😢')
    // Optionally: logout user
    localStorage.removeItem('token')
    window.location.href = '/login'
  }

  if (!user) return <p className="text-center mt-10">Loading...</p>

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto p-8"
    >
      {/* Kiri: Foto Profil */}
      <div className="flex flex-col items-center gap-4">
        <img
          src={preview || user.profile_picture || '/profile.png'}
          alt="Foto Profil"
          className="w-64 h-64 rounded-full object-cover border-4 border-gray-300"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="text-sm"
        />
      </div>

      {/* Kanan: Form Input */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold mb-1">Username</label>
          <p className="text-xs text-gray-50 mb-1">Saat ini: {user.username}</p>
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleInputChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">Email</label>
          <p className="text-xs text-gray-50 mb-1">Saat ini: {user.email}</p>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleInputChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Simpan Perubahan
          </button>

          <button
            type="button"
            onClick={handleDelete}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Hapus Akun
          </button>
        </div>
      </div>
    </form>
  )
}
