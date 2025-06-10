import { Suspense } from "react";
import BookingHome from "@/app/suspense/booking-suspense";

export default function Booking(){
  return(
    <Suspense>
      <BookingHome/>
    </Suspense>
  )
}