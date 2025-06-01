'use client'

import { useState } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { ArrowUpRightIcon, Bars3Icon, XMarkIcon, HandThumbUpIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'

const navigation = [
  { name: 'Home', href: '/home' },
  { name: 'Assessment', href: '/home/assessment' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
]

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="bg-white max-h-max overflow-x-hidden">
      {/* header */}
      <header className="absolute inset-x-0 top-0 z-50">
        {/* navbar */}
        <nav aria-label="Global" className="bg-sky-600 shadow-2xl fixed top-0 left-0 right-0 flex items-center justify-between m-3 p-4 lg:px-8 rounded-full">
          {/* logo */}
          <div className="flex lg:flex-1">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Sejiwa</span>
              <img
                alt=""
                src="/icon.png"
                className="h-8 w-auto"
              />
            </Link>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white"
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="size-8"/>
            </button>
          </div>
          {/* menu list */}
          <div className="hidden lg:flex lg:gap-x-4">
            {navigation.map((item) => (
              <Link key={item.name} href={item.href} className="-my-4 p-3.5 text-lg font-semibold text-white hover:bg-sky-700">
                {item.name}
              </Link>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end align-center">
            <Link href="/login" className="-my-4 p-4 rounded-full text-lg font-semibold text-white hover:bg-sky-700">
              Log in
            </Link>
            <Link href="/register" className="bg-white isolate rounded-full -my-4 -mr-7 px-5 py-4 text-lg font-semibold text-gray-950 hover:bg-sky-100">
              Sign up
            </Link>
          </div>
        </nav>
        {/* mobile */}
        <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
          <div className="fixed inset-0 z-49" />
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <Link href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <img
                  alt=""
                  src="/icon.png"
                  className="h-8 w-auto invert"
                />
              </Link>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
                <div className="py-6">
                  <Link
                    href="/login"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                  >
                    Log in
                  </Link>
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>

      {/* hero section */}
      <div className="relative isolate md:flex px-6 pt-1 lg:px-8">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 z-0 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%-11rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          />
        </div>
        <div className="mx-auto md:ml-10 max-w-2xl pt-40 sm:pt-48 lg:pt-56 sm:pb-24 md:pb-32 lg:pb-48">
          <div className="text-center md:text-start md:mr-20">
            <h1 className="text-5xl font-semibold tracking-tight text-balance text-gray-950 sm:text-5xl">
              Platform Konseling Digital
            </h1>
            <p className="mx-5 md:mx-auto mt-8 md:mr-10 text-sm md:text-lg font-medium text-pretty text-gray-800 sm:text-lg">
              Yang dirancang untuk membantu individu dalam perjalanan menuju kesadaran dan kesejahteraan diri. Dengan pendekatan postmodern, SEJIWA menawarkan pengalaman konseling yang interaktif dan personal, berfokus pada mindfulness, refleksi diri, dan keseimbangan emosional.
            </p>
            <div className="mt-10 flex items-center justify-center md:justify-start gap-x-6">
              <Link
                href="#"
                className="flex items-center justify-center z-50 rounded-4xl bg-sky-600 px-5 py-2.5 text-lg font-semibold text-white shadow-xs hover:bg-sky-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
              >
                Assessment<ArrowUpRightIcon className="ml-2 size-5"/>
              </Link>
            </div>
          </div>
        </div>
        <div className="md:mx-auto md:max-w-2xl md:py-48 pb-16 lg:py-56 flex justify-center">
          <img src="/hero.png" className="w-100 h-auto  object-cover"></img>
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[calc(100%-13rem)] z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%+3rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          />
        </div>
      </div>

      {/* feature section */}
      <div className="relative md:-top-10 z-0">
        <div className="absolute -z-9999 -top-10 md:-top-10 -left-60 lg:-left-50 m-0 w-80 md:w-100 h-80 md:h-100 rounded-full bg-sky-500"></div>
        
        <div className="mb-20 flex items-center justify-center text-5xl font-semibold tracking-tight text-balance text-gray-950 sm:text-5xl">
          Fitur Utama
          {/* <div className="absolute top-7 left-80 -z-10 w-20 h-5 rounded-full bg-sky-500"/> */}
        </div>

        <div className="relative flex flex-wrap align-center justify-center z-10 m-5 gap-5 md:gap-10">
          <div className="p-5 py-5 w-40 md:w-50 h-80 md:h-80 rounded-2xl bg-sky-200 flex flex-col gap-5 justify-start">
            <HandThumbUpIcon className="p-1 rounded-xl size-10 bg-sky-500" />
            <h1 className="text-gray-900">
              Membantu pengguna memahami dan mengelola stres serta kecemasan melalui pendekatan post-modern.
            </h1>
          </div>
          <div className="p-5 py-5 w-40 md:w-50 h-80 md:h-80 rounded-2xl bg-sky-200 flex flex-col gap-5 justify-start">
            <HandThumbUpIcon className="p-1 rounded-xl size-10 bg-sky-500" />
            <h1 className="text-gray-900">
              Meningkatkan kesadaran diri dan kesejahteraan emosional melalui latihan reflektif dan praktik relaksasi.
            </h1>
          </div>
          <div className="p-5 py-5 w-40 md:w-50 h-80 md:h-80 rounded-2xl bg-sky-200 flex flex-col gap-5 justify-start">
            <HandThumbUpIcon className="p-1 rounded-xl size-10 bg-sky-500" />
            <h1 className="text-gray-900">
              Membantu pengguna memahami dan mengelola stres serta kecemasan melalui pendekatan post-modern.
            </h1>
          </div>
          <div className="p-5 py-5 w-40 md:w-50 h-80 md:h-80 rounded-2xl bg-sky-200 flex flex-col gap-5 justify-start">
            <HandThumbUpIcon className="p-1 rounded-xl size-10 bg-sky-500" />
            <h1 className="text-gray-900">
              Meningkatkan kesadaran diri dan kesejahteraan emosional melalui latihan reflektif dan praktik relaksasi.
            </h1>
          </div>
        </div>

        <div className="absolute top-50 -right-50 m-0 w-80 md:w-100 h-80 md:h-100 rounded-full bg-sky-500 overflow-x-hidden-hidden"></div>
      </div>
      <button onClick={() => setMobileMenuOpen(true)} className="fixed md:hidden h-15 sm:h-20 w-15 sm:w-20 rounded-full z-50 bottom-6 right-6 bg-gray-900">
        <img src="/favicon.ico"/>
      </button>

      {/* footer */}
      <div className="bg-gray-800 text-white py-10 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-row items-center justify-center">
            <div className="flex flex-col items-center justify-center">
              <img src="/icon.png" alt="Logo" className="h-16 w-auto mb-4" />
              <p className="text-center text-sm">
                &copy; {new Date().getFullYear()} Sejiwa. All rights reserved.
              </p>
              <div className="mt-4 flex space-x-4">
                <Link href="/privacy" className="text-sm hover:underline">Privacy Policy</Link>
                <Link href="/terms" className="text-sm hover:underline">Terms of Service</Link>
              </div>
            </div>
              <div className="flex flex-col items-center justify-center ml-10">
              <h2 className="text-lg font-semibold mb-2">Sejiwa</h2>
              <div className='flex flex-col items-center justify-center'>
                <Link href="/home" className="text-white hover:text-gray-400">Home</Link>
                <Link href="/assessment" className="text-white hover:text-gray-400">Assessment</Link>
                <Link href="/about" className="text-white hover:text-gray-400">About</Link>
                <Link href="/contact" className="text-white hover:text-gray-400">Contact</Link>
              </div>
              </div>
              <div className="flex flex-col items-center justify-center ml-10">
              <h2 className="text-lg font-semibold mb-2">Follow Us</h2>
              <div className="flex flex-col space-x-4">
                <Link href="#" className="text-white hover:text-gray-400">
                  <img src="/icons/facebook.svg" alt="Facebook" className="h-6 w-6"/>
                </Link>
                <Link href="#" className="text-white hover:text-gray-400">
                  <img src="/icons/twitter.svg" alt="Twitter" className="h-6 w-6"/>
                </Link>
                <Link href="#" className="text-white hover:text-gray-400">
                  <img src="/icons/instagram.svg" alt="Instagram" className="h-6 w-6"/>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
