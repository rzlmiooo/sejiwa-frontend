import { Suspense } from "react";
import CreateBooking from "@/app/suspense/create-booking-suspense";

export default function CreateBook(){
    return(
        <Suspense>
            <CreateBooking/>
        </Suspense>
    )
}