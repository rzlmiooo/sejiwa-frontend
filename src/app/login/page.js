import { Josefin_Slab } from "next/font/google";
import { Description, Field, Input, Label, Button } from '@headlessui/react'
import clsx from 'clsx'
import Check from '../components/checkbox'

const josefinSlab = Josefin_Slab({
  variable: '--font-josefin-slab',
  subsets: ['latin'],
})

export default function Form() {
  return (
    <div className="flex h-screen bg-white overflow-hidden">
      {/* scrolling animation */}
      <div className="hidden sm:flex object-cover justify-center items-center w-full m-5 gap-5 bg-sky-50">
        <div className="flex flex-col gap-5">
          <div className="p-5 py-5 w-50 md:w-60 h-80 md:h-80 rounded-2xl bg-gray-200"/>
          <div className="p-5 py-5 w-50 md:w-60 h-80 md:h-80 rounded-2xl bg-gray-200"/>
          <div className="p-5 py-5 w-50 md:w-60 h-80 md:h-80 rounded-2xl bg-gray-200"/>
        </div>
        <div className="hidden lg:flex flex-col gap-5">
          <div className="p-5 py-5 w-50 md:w-60 h-80 md:h-80 rounded-2xl bg-gray-200"/>
          <div className="p-5 py-5 w-50 md:w-60 h-80 md:h-80 rounded-2xl bg-gray-200"/>
          <div className="p-5 py-5 w-50 md:w-60 h-80 md:h-80 rounded-2xl bg-gray-200"/>
          <div className="p-5 py-5 w-50 md:w-60 h-80 md:h-80 rounded-2xl bg-gray-200"/>
        </div>
      </div>
      {/* form */}
      <div className="p-5 bg-sky-500 h-full w-full">
        <div className="flex flex-col justify-center items-start m-auto h-full w-full p-10 bg-sky-700 rounded-2xl">
          <div className="flex items-center justify-start gap-5 m-5">
            <img src="/icon.png" alt="logo" className="h-10 w-auto"/>
            <h1 className="text-l text-white">Login</h1>
          </div>
          <h1 className={`${josefinSlab.className} m-5 text-2xl font-bold`}>Mindfulness, Refleksi diri, dan Keseimbangan Emosional</h1>
          <Field className="mx-5 my-4">
            <Label className="text-sm/6 font-medium text-white">Email</Label>
            <Description className="text-sm/6 text-white/50">Masukkan nama emailmu.</Description>
            <Input type="email"
              className={clsx(
                'mt-3 block w-full rounded-lg border-none bg-white/5 px-3 py-1.5 text-sm/6 text-white',
                'focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25'
              )}
            />
          </Field>
          <Field className="mx-5 my-4">
            <Label className="text-sm/6 font-medium text-white">Password</Label>
            <Description className="text-sm/6 text-white/50">Masukkan password akunmu.</Description>
            <Input type="password"
              className={clsx(
                'mt-3 block w-full rounded-lg border-none bg-white/5 px-3 py-1.5 text-sm/6 text-white',
                'focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25'
              )}
            />
          </Field>
          <div className="m-5 flex justify-start items-center gap-3 text-sm/6 font-bold">
            <Check />
            Ingat akun ini
          </div>
          <Button className="mx-5 rounded bg-sky-600 px-21 py-2 text-sm text-white data-active:bg-sky-700 data-hover:bg-sky-500">
            Login
          </Button>
        </div>
      </div>
    </div>
  )
}
