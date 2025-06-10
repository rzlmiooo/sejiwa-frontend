import { Suspense } from "react";
import FindConselor from "@/app/suspense/find-suspense";

export default function SearchConselor(){
  return (
    <Suspense>
      <FindConselor/>
    </Suspense>
  )
}