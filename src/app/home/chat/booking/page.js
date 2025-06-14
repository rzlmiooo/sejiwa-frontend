import { Suspense } from "react"
import BookingSchedule from "@/app/suspense/bookschedule-suspense"

export default function Book(){
    return (
        <Suspense>
            <BookingSchedule/>
        </Suspense>
    )
}