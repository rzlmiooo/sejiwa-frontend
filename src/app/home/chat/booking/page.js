import { Suspense } from "react"
import BookingSchedule from "@/app/suspense/students/bookschedule-suspense"

export default function Book(){
    return (
        <Suspense>
            <BookingSchedule/>
        </Suspense>
    )
}