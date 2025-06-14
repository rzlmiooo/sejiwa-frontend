import { Suspense } from "react";
import FindConselor from "@/app/suspense/find-konselor-suspense";

export default function SearchConselor(){
  return (
    <Suspense>
      <FindConselor/>
    </Suspense>
  )
}