import { Suspense } from "react";
import CreateBooking from "@/app/suspense/students/create-booking-suspense";

export default function CreateBook(){
    return(
        <Suspense>
            <CreateBooking/>
        </Suspense>
    )
}