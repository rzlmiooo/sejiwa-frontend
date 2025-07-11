'use client'

import Link from "next/link"
import Image from "next/image"
import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/solid"
import { useState } from "react"
import { AuthService } from "@/app/service/AuthService"

export default function Setting() {
  const [error, setError] = useState("");
  
  const logout = async (e) => {
    e.preventDefault();
    setError("");
    try {
        AuthService.logout(); 
        console.log("Logout Successful");
        await router.push("/"); 
    } catch (err) {
        console.error("Logout error:", err?.response?.data || err.message);
        setError(err?.response?.data?.message || "Logout failed");
    }
  }

  return (
    <div className="flex-1 w-full m-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-6 sm:px-4 w-full h-max">
        <Link href="/home/settings/profile" className="bg-sky-50 dark:bg-sky-950 rounded-tl-4xl sm:rounded-tl-4xl rounded-tr-4xl sm:rounded-tr-none rounded-bl-none sm:rounded-bl-4xl shadow-md p-10 flex flex-col items-start space-y-2 border-t-2 border-t-blue-200 hover:scale-101">
            <h2 className="text-xl font-bold text-gray-900 dark:text-sky-50">Akun Saya</h2>
            <p className="text-sm text-gray-600 dark:text-sky-50">Pusat informasi tentang akunmu</p>
            <div className="mt-11 flex justify-center items-center">
                <Image src="/profile.png" alt="Image 3" width={100} height={100} className="w-22 sm:w-28 h-auto object-cover rounded-xl"/>
            </div>
        </Link>
        <div>

        <button onClick={logout} className="bg-sky-50 dark:bg-sky-950 rounded-bl-4xl sm:rounded-bl-none rounded-br-4xl sm:rounded-tr-4xl shadow-md p-10 flex flex-col items-start space-y-2 border-t-2 border-t-blue-200 hover:scale-101">
            <h2 className="text-xl font-bold text-gray-900 dark:text-sky-50">Keluar dari Akun</h2>
            <p className="text-sm text-gray-600 dark:text-sky-50">Terimakasih telah menggunakan Sejiwa.</p>
            <div className="mt-12 flex justify-center items-center">
              <ArrowLeftStartOnRectangleIcon className='size-26 sm:size-28 text-gray-300 dark:text-gray-300'/>
            </div>
        </button>

        </div>
      </div>
    </div>
    
  )
}