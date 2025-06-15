import { Suspense } from "react";
import BookingHome from "@/app/suspense/konselor/konselor-bookings-suspense";

export default function Booking(){
  return(
    <Suspense>
      <BookingHome/>
    </Suspense>
  )
}