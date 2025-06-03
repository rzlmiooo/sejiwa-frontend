import Link from 'next/link'
import Path from '../components/pathname'
import { Bars3Icon } from '@heroicons/react/24/solid'

const navigation = [
    {src: '/dashboard.png', name: 'Beranda', href: '/home' },
    {src: '/assessment.png', name: 'Assessment', href: '/home/assessment' },
    {src: '/like.png', name: 'Rekomendasi', href: '/home/recommendation' },
    {src: '/chat.png', name: 'Chat Konselor', href: '/home/chat' },
    {src: '/settings.png', name: 'Pengaturan', href: '/home/settings' }
]

let username = 'Rizal'

export default function Homepage({ children }){
    return (
        <div className="h-screen flex flex-col bg-sky-50 overflow-hidden">
            {/* header */}
            <div className="m-0 p-4 w-screen flex justify-between items-center bg-sky-600">
                <div className="flex justify-center items-center gap-5">
                    <Bars3Icon className="size-8"></Bars3Icon>
                    <Link href="/home" className="flex gap-3 text-sm/6">
                        <img src="/icon.png" alt="" className="w-24 h-auto"></img>
                        <Path />
                    </Link>
                </div>
                <div className="flex justify-center items-center gap-3">
                    <h1 className="hidden sm:block font-bold">Hi, { username }</h1>
                    <img src="/favicon.ico" alt="" className="p-1 bg-sky-50 rounded-full w-10 h-auto"></img>
                </div>
            </div>
            <div className="h-screen flex flex-row">
                {/* sidebar */}
                <div className="p-1 w-18 sm:w-72 bg-gray-900 border-r-1 border-white">
                    {navigation.map((item) => (
                        <Link key={item.name} href={item.href} className="mx-5 my-8 flex flex-row items-center gap-5 text-xl font-bold hover:scale-102">
                        <img src={item.src} className='w-5 h-5'></img><h1 className="hidden md:block">{item.name}</h1>
                        </Link>
                    ))}
                </div>
                {children}
            </div>
        </div>
    )
}