import { Suspense } from "react"
import Consultations from "@/app/suspense/consultations-suspense"

export default function Konsultasi(){
    return (
        <Suspense>
            <Consultations/>
        </Suspense>
    )
}