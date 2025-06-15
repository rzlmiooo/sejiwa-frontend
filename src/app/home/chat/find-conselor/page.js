import { Suspense } from "react";
import FindConselor from "@/app/suspense/students/find-konselor-suspense";

export default function SearchConselor(){
  return (
    <Suspense>
      <FindConselor/>
    </Suspense>
  )
}