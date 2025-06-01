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
        <div className="h-screen flex flex-col bg-sky-50 overflow-hidden">
            {/* header */}
            <div className="m-0 p-4 w-screen flex justify-between items-center bg-sky-600">
                <div className="flex justify-center items-center gap-5">
                    <Bars3Icon className="size-8"></Bars3Icon>
                    <Link href="/home" className="flex gap-3 text-sm/6">
                        <img src="/icon.png" alt="" className="w-24 h-auto"></img>
                        Beranda
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
                <div className="flex flex-col justify-start items-start p-5 m-4 w-full">
                    <div className="text-gray-900 text-xl font-bold">
                        Halo Rizal! Selamat datang di Sejiwa.
                    </div>
                    <div className="text-gray-900 text-lg font-medium">
                        Temukan ketenangan jiwamu
                    </div>
                    <div className="mt-5 grid gap-4 sm:mt-8 lg:grid-cols-3 lg:grid-rows-2">
                      <div className="relative lg:row-span-1">
                        <div className="absolute inset-px rounded-lg bg-white lg:rounded-l-4xl"></div>
                        <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] lg:rounded-l-[calc(2rem+1px)]">
                          <div className="px-8 pt-4 pb-3 sm:px-10 sm:pt-5 sm:pb-0">
                            <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">
                              Rekomendasi
                            </p>
                            <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                              Video dan Artikel refleksi sesuai kondisimu saat ini.
                            </p>
                          </div>
                          <div className="@container relative min-h-120 w-full grow max-lg:mx-auto max-lg:max-w-sm">
                            <div className="absolute inset-x-10 top-5 bottom-0 overflow-hidden rounded-t-[12cqw] border-x-[3cqw] border-t-[3cqw] border-gray-700 bg-gray-900 shadow-2xl">
                              <img
                                className="size-full object-cover object-top"
                                src="https://tailwindcss.com/plus-assets/img/component-images/bento-03-mobile-friendly.png"
                                alt=""
                              />
                            </div>
                          </div>
                        </div>
                        <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm ring-1 ring-black/5 lg:rounded-l-4xl"></div>
                      </div>
                      <div className="relative max-lg:row-start-1">
                        <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-t-4xl"></div>
                        <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)]">
                          <div className="px-8 pt-4 sm:px-10 sm:pt-5">
                            <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">Assessment</p>
                            <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                                Survei singkat untuk mengenal dirimu.
                            </p>
                          </div>
                          <div className="flex flex-1 items-center justify-center px-8 max-lg:pt-10 max-lg:pb-12 sm:px-10 lg:pb-2">
                            <img
                              className="w-full max-lg:max-w-xs"
                              src="https://tailwindcss.com/plus-assets/img/component-images/bento-03-performance.png"
                              alt=""
                            />
                          </div>
                        </div>
                        <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm ring-1 ring-black/5 max-lg:rounded-t-4xl"></div>
                      </div>
                      <div className="relative max-lg:row-start-3 lg:col-start-2 lg:row-start-2">
                        <div className="absolute inset-px rounded-lg bg-white"></div>
                        <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)]">
                          <div className="px-8 pt-4 sm:px-10 sm:pt-5">
                            <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">Security</p>
                            <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                              Morbi viverra dui mi arcu sed. Tellus semper adipiscing suspendisse semper morbi.
                            </p>
                          </div>
                          <div className="@container flex flex-1 items-center max-lg:py-6 lg:pb-2">
                            <img
                              className="h-[min(152px,40cqw)] object-cover"
                              src="https://tailwindcss.com/plus-assets/img/component-images/bento-03-security.png"
                              alt=""
                            />
                          </div>
                        </div>
                        <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm ring-1 ring-black/5"></div>
                      </div>
                      <div className="relative lg:row-span-2">
                        <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-b-4xl lg:rounded-r-4xl"></div>
                        <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-b-[calc(2rem+1px)] lg:rounded-r-[calc(2rem+1px)]">
                          <div className="px-8 pt-4 pb-3 sm:px-10 sm:pt-5 sm:pb-0">
                            <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">
                              Chat dengan Konselor
                            </p>
                            <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                              Dapatkan pengalaman konseling terbaik dari para konselor profesional. Tidak dipungut biaya.
                            </p>
                          </div>
                          <div className="relative min-h-120 w-full grow">
                            <div className="absolute top-10 right-0 bottom-0 left-10 overflow-hidden rounded-tl-xl bg-gray-900 shadow-2xl">
                              <div className="flex bg-gray-800/40 ring-1 ring-white/5">
                                <div className="-mb-px flex text-sm/6 font-medium text-gray-400">
                                  <div className="border-r border-b border-r-white/10 border-b-white/20 bg-white/5 px-4 py-2 text-white">
                                    NotificationSetting.jsx
                                  </div>
                                  <div className="border-r border-gray-600/10 px-4 py-2">App.jsx</div>
                                </div>
                              </div>
                              <div className="px-6 pt-6 pb-14">{/* Your code example */}</div>
                            </div>
                          </div>
                        </div>
                        <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm ring-1 ring-black/5 max-lg:rounded-b-4xl lg:rounded-r-4xl"></div>
                      </div>
                    </div>
                </div>
            </div>
        </div>
    )
}