import { Suspense } from "react";
import FindConselor from "@/app/suspense/students/find-konselor-suspense";

export const metadata = {
  title: 'Cari Konselor',
  description: 'Pilih Konselor yang tersedia',
}

export default function SearchConselor(){
  return (
    <Suspense>
      <FindConselor/>
    </Suspense>
  )
}