import { redirect } from "next/navigation"
import { cookies } from "next/headers"

export default function Middleman() {
    const cookieStore = cookies()
    const token = cookieStore.get('token')?.value // atau "session" tergantung kamu simpan apa
    if (!token) {
      redirect('/login') // kalau belum login, lempar ke /login
    }
}