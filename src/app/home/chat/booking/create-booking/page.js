import { Suspense } from "react";
import CreateBooking from "@/app/suspense/newbook-suspense";

export default function CreateBook(){
    return(
        <Suspense>
            <CreateBooking/>
        </Suspense>
    )
}