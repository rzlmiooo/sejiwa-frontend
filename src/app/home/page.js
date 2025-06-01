import Link from 'next/link'
import { Bars3Icon } from '@heroicons/react/24/solid'

const navigation = [
    {src: '/dashboard.png', name: 'Beranda', href: '/home' },
    {src: '/assessment.png', name: 'Assessment', href: '/home/assessment' },
    {src: '/like.png', name: 'Rekomendasi', href: '/home/recommendation' },
    {src: '/chat.png', name: 'Chat Konselor', href: '/home/chat' },
    {src: '/settings.png', name: 'Pengaturan', href: '/home/settings' }
]

export default function Home(){
    return (
        <div className="h-screen flex flex-col bg-sky-50">
            {/* header */}
            <div className="m-0 p-4 w-screen flex justify-between items-center bg-sky-600">
                <div className="flex justify-center items-center gap-5">
                    <Bars3Icon className="size-8"></Bars3Icon>
                    <Link href="/home">
                        <img src="/icon.png" alt="" className="w-24 h-auto"></img>
                    </Link>
                </div>
                <div className="flex justify-center items-center gap-3">
                    <h1 className="hidden sm:block font-bold">Hi, Rizal</h1>
                    <img src="/favicon.ico" alt="" className="p-1 bg-sky-50 rounded-full w-10 h-auto"></img>
                </div>
            </div>
            <div className="h-screen flex flex-row">
                {/* sidebar */}
                <div className="p-1 w-1/4 bg-gray-900 border-r-1 border-white">
                    {navigation.map((item) => (
                        <Link key={item.name} href={item.href} className="mx-5 my-8 flex flex-row items-center gap-5 text-xl font-bold">
                        <img src={item.src} className='w-5 h-5'></img><h1 className="hidden md:block">{item.name}</h1>
                        </Link>
                    ))}
                </div>
                {/* main screen */}
                <div className="p-5 m-5 w-full">
                    {/* <div id="" className="flex justify-start items-center text-lg font-bold">Mulai assessment</div>
                    <div id="" className="flex justify-start items-center text-lg font-bold">Video relaksasi</div>
                    <div id="" className="flex justify-start items-center text-lg font-bold">Artikel refleksi</div>
                    <div id="" className="flex justify-start items-center text-lg font-bold">Chat dengan konselor</div>
                    <div id="" className="flex justify-start items-center text-lg font-bold">Pengaturan Akun</div> */}
                </div>
            </div>
        </div>
    )
}