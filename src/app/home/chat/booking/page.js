import { Suspense } from "react"
import BookingSchedule from "@/app/suspense/students/bookschedule-suspense"

export const metadata = {
    title: 'Booking',
    description: 'Atur jadwal booking Pelajar.',
}

export default function Book(){
    return (
        <Suspense>
            <BookingSchedule/>
        </Suspense>
    )
}