import Link from 'next/link'

let username = 'Rizal'

export default function Home(){
    return (
        <div className="flex flex-col justify-start items-start p-5 m-4 w-fit sm:max-w-4xl overflow-y-scroll lg:overflow-y-hidden">
            <div className="text-gray-900 text-xl font-bold">
                Halo { username }! Selamat datang di Sejiwa.
            </div>
            <div className="text-gray-900 text-lg font-medium">
                Temukan ketenangan jiwamu.
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 w-full h-full">

            {/* <!-- Bento 1 --> */}
            <Link href="/home/assessment" className="bg-white rounded-l-4xl shadow-md p-10 flex flex-col items-start space-y-2 border-t-2 border-t-blue-200 hover:scale-101">
              <h2 className="text-xl font-bold text-gray-900">Assessment</h2>
              <p className="text-sm text-gray-600">Survei singkat untuk mengetahui isi hatimu.</p>
              <div className="mt-10 flex justify-center items-center">
                <img src="/assessment.png" alt="Image 3" className="w-32 h-auto object-cover rounded-xl"/>
              </div>
            </Link>
                
              {/* <!-- Bento 2 --> */}
            <Link href="/home/recommendation" className="bg-white shadow-md p-10 flex flex-col items-start space-y-2 border-t-2 border-t-blue-200 hover:scale-101">
                <h2 className="text-xl font-bold text-gray-900">Rekomendasi</h2>
                <p className="text-sm text-gray-600">Video dan artikel yang Sejiwa rekomendasikan khusus untukmu.</p>
                <div className="mt-10 flex justify-center items-center">
                  <img src="/like.png" alt="Image 3" className="w-32 h-auto object-cover rounded-xl"/>
                </div>
            </Link>
                
              {/* <!-- Bento 3 --> */}
            <Link href="/home/chat" className="bg-white rounded-r-4xl shadow-md p-10 flex flex-col items-start space-y-2 border-t-2 border-t-blue-200 hover:scale-101">
              <h2 className="text-xl font-bold text-gray-900">Chat</h2>
              <p className="text-sm text-gray-600">Pengalaman konseling terbaik dari para konselor profesional. Gratis.</p>
              <div className="mt-12 flex justify-center items-center">
                <img src="/chat.png" alt="Image 3" className="w-32 h-auto object-cover rounded-xl"/>
              </div>
            </Link>
            </div>
        </div>
    )
}