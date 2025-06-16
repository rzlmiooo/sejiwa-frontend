import Link from 'next/link'
import Path from '../components/pathname'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid'
import UserGreeting from '../components/greetings'

export default function Navbar({ toggleSidebar, isSidebarOpen }) {
    return (
        // header
        <div className="m-0 p-4 w-screen flex justify-between items-center bg-sky-600">
            <div className="flex justify-center items-center gap-5">
                <div onClick={toggleSidebar} className="size-8 cursor-pointer text-sky-50 dark:text-sky-50">
                    { isSidebarOpen ? <XMarkIcon/> : <Bars3Icon/> }
                </div>
                <Link href="/home" className="flex gap-3 text-sm/6 text-sky-50 dark:text-sky-50 border-none outline-none shadow-none focus:outline-none">
                    <img src="/icon.png" alt="" className="w-24 h-auto"></img>
                    <Path />
                </Link>
            </div>
            <Link href="/home/settings/profile/" className="flex justify-center items-center gap-3">
                <h1 className="hidden sm:block font-bold text-sky-50 dark:text-sky-50">Hi, <UserGreeting/></h1>
                <img src="/profile.png" alt="" className="p-1 bg-sky-50 dark:bg-sky-50 rounded-full w-10 h-auto"></img>
            </Link>
        </div>
    )
}