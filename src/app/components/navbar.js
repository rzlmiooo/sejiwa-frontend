import Link from 'next/link'
import Path from '../components/pathname'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid'
import UserGreeting from '../components/greetings'
import UserProfile from './foto'
import { usePathname } from 'next/navigation'
import NotificationBell from './notificationBell'

export default function Navbar({ toggleSidebar, isSidebarOpen }) {
    const pathname = usePathname();
    const isCounselorPage = pathname.startsWith('/konselor');
    const href = isCounselorPage ? '/konselor' : '/home';
    const profile = isCounselorPage ? '/konselor/profile' : '/home/settings/profile'

    return (
        // header
        <div className="m-0 p-4 w-screen flex justify-between items-center bg-sky-600">
            <div className="flex justify-center items-center gap-5">
                <div onClick={toggleSidebar} className="size-8 cursor-pointer text-sky-50 dark:text-sky-50">
                    { isSidebarOpen ? <XMarkIcon/> : <Bars3Icon/> }
                </div>
                <Link href={href} className="flex gap-3 text-sm/6 text-sky-50 dark:text-sky-50 border-none outline-none shadow-none focus:outline-none">
                    <img src="/icon.png" alt="" className="w-24 h-auto"></img>
                    <Path />
                </Link>
            </div>
            <div className="flex justify-center items-center gap-6">
                <NotificationBell className="mr-10"></NotificationBell>
                <Link href={profile} className="flex justify-center items-center gap-3">
                    <h1 className="hidden sm:block font-bold text-sky-50 dark:text-sky-50">Hi, <UserGreeting/></h1>
                    <UserProfile />
                </Link>
            </div>
        </div>
    )
}