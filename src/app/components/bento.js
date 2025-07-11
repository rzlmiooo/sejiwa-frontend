import Link from "next/link"
import Image from "next/image"

export default function Bento() {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 w-full min-h-max">
      {/* <!-- Bento 1 --> */}
      <Link href="/home/assessment" className="bg-sky-50 dark:bg-sky-950 rounded-tl-4xl sm:rounded-tl-4xl rounded-tr-4xl sm:rounded-tr-none rounded-bl-none sm:rounded-bl-4xl shadow-md p-10 flex flex-col items-start space-y-2 border-t-2 border-t-blue-200 hover:scale-101">
        <h2 className="text-xl font-bold text-gray-900 dark:text-sky-50">Assessment</h2>
        <p className="text-sm text-gray-600 dark:text-sky-50">Survei singkat untuk mengetahui isi hatimu.</p>
        <div className="mt-10 flex justify-center items-center">
          <Image src="/assessment.png" alt="Image 3" width={100} height={100} className="w-22 sm:w-32 h-auto object-cover rounded-xl"/>
        </div>
      </Link>
          
        {/* <!-- Bento 2 --> */}
      <Link href="/home/recommendation" className="bg-sky-50 dark:bg-sky-950 shadow-md p-10 flex flex-col items-start space-y-2 border-t-2 border-t-blue-200 hover:scale-101">
          <h2 className="text-xl font-bold text-gray-900 dark:text-sky-50">Rekomendasi</h2>
          <p className="text-sm text-gray-600 dark:text-sky-50">Video dan artikel yang Sejiwa rekomendasikan khusus untukmu.</p>
          <div className="mt-10 flex justify-center items-center">
            <Image src="/like.png" alt="Image 3" width={100} height={100} className="w-24 sm:w-32 h-auto object-cover rounded-xl"/>
          </div>
      </Link>
          
        {/* <!-- Bento 3 --> */}
      <Link href="/home/chat" className="bg-sky-50 dark:bg-sky-950 rounded-bl-4xl sm:rounded-bl-none rounded-br-4xl sm:rounded-tr-4xl shadow-md p-10 flex flex-col items-start space-y-2 border-t-2 border-t-blue-200 hover:scale-101">
        <h2 className="text-xl font-bold text-gray-900 dark:text-sky-50">Chat</h2>
        <p className="text-sm text-gray-600 dark:text-sky-50">Pengalaman konseling terbaik dari para konselor profesional. Gratis.</p>
        <div className="mt-12 flex justify-center items-center">
          <Image src="/chat.png" alt="Image 3" width={100} height={100} className="w-24 sm:w-32 h-auto object-cover rounded-xl"/>
        </div>
      </Link>
      </div>
    )
  }
  