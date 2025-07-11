import Link from "next/link"
import Image from "next/image"

export default function ChatHome() {
    return (
        <div className="flex-1 flex-col justify-start items-start p-5 m-4 pb-32 sm:max-w-4xl overflow-y-scroll sm:overflow-y-hidden">
            {/* headline */}
            <div className="px-4 font-bold text-xl sm:text-2xl text-gray-900 dark:text-sky-50">
                Temukan Konselor untukmu.<br/><span className="text-sm sm:text-lg font-medium">Klik Cari Konselor</span>
            </div>
            {/* grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 w-full min-h-max">
                {/* grid 1 */}
                <Link href="/home/chat/find-conselor" className="bg-sky-50 dark:bg-sky-950 rounded-tl-4xl sm:rounded-tl-4xl rounded-tr-4xl sm:rounded-tr-none rounded-bl-none sm:rounded-bl-4xl shadow-md p-10 flex flex-col items-start space-y-2 border-t-2 border-t-blue-200 hover:scale-101">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-sky-50">Cari Konselor</h2>
                    <p className="text-sm text-gray-600 dark:text-sky-50">Pilih konselor yang tersedia</p>
                    <div className="mt-11 flex justify-center items-center">
                        <Image src="/conselor-search.png" alt="Search" width={100} height={100} className="w-24 sm:w-32 h-auto object-cover rounded-xl"/>
                    </div>
                </Link>
                <Link href="/home/chat/chat-pelajar" className="bg-sky-50 dark:bg-sky-950 shadow-md p-10 flex flex-col items-start space-y-2 border-t-2 border-t-blue-200 hover:scale-101">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-sky-50">Chat Room</h2>
                    <p className="text-sm text-gray-600 dark:text-sky-50">Lanjutkan Chat dengan Konselor</p>
                    <div className="mt-11 flex justify-center items-center">
                        <Image src="/chat.png" alt="Chat" width={100} height={100} className="w-24 sm:w-32 h-auto object-cover rounded-xl"/>
                    </div>
                </Link>
                <Link href="/home/chat/booking" className="bg-sky-50 dark:bg-sky-950 rounded-bl-4xl sm:rounded-bl-none rounded-br-4xl sm:rounded-tr-4xl shadow-md p-10 flex flex-col items-start space-y-2 border-t-2 border-t-blue-200 hover:scale-101">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-sky-50">Booking</h2>
                    <p className="text-sm text-gray-600 dark:text-sky-50">Tentukan waktu yang tepat bersama konselor</p>
                    <div className="mt-12 flex justify-center items-center">
                        <Image src="/booking.png" alt="Booking" width={100} height={100} className="w-18 sm:w-24 h-auto object-cover rounded-xl"/>
                    </div>
                </Link>
            </div>
        </div>
    )
}