import Link from "next/link"

export default function ChatHome() {
    return (
        <div className="flex-1 flex-col justify-start items-start p-5 m-4 w-fit sm:max-w-4xl overflow-y-scroll lg:overflow-y-hidden">
            {/* headline */}
            <div className="px-4 font-bold text-2xl text-gray-900">
                Temukan Konselor untukmu.<br/><span className="text-lg font-medium">Klik Cari Konselor</span>
            </div>
            {/* grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 w-full min-h-max">
                {/* grid 1 */}
                <Link href="/home/chat/find-conselor" className="bg-white rounded-tl-4xl sm:rounded-tl-4xl rounded-tr-4xl sm:rounded-tr-none rounded-bl-none sm:rounded-bl-4xl shadow-md p-10 flex flex-col items-start space-y-2 border-t-2 border-t-blue-200 hover:scale-101">
                    <h2 className="text-xl font-bold text-gray-900">Cari Konselor</h2>
                    <p className="text-sm text-gray-600">Pilih konselor yang tersedia</p>
                    <div className="mt-11 flex justify-center items-center">
                        <img src="/conselor-search.png" alt="Image 3" className="w-32 h-auto object-cover rounded-xl"/>
                    </div>
                </Link>
                <div>

                <Link href="/home/chat/booking" className="bg-white rounded-bl-4xl sm:rounded-bl-none rounded-br-4xl sm:rounded-tr-4xl shadow-md p-10 flex flex-col items-start space-y-2 border-t-2 border-t-blue-200 hover:scale-101">
                    <h2 className="text-xl font-bold text-gray-900">Booking</h2>
                    <p className="text-sm text-gray-600">Tentukan waktu yang tepat bersama konselor</p>
                    <div className="mt-12 flex justify-center items-center">
                        <img src="/booking.png" alt="Image 3" className="w-24 h-auto object-cover rounded-xl"/>
                    </div>
                </Link>

                </div>
            </div>
        </div>
    )
}