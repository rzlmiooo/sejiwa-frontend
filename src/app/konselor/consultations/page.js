import { Suspense } from "react"
import Consultations from "@/app/suspense/konselor/consultations-suspense"

export default function Konsultasi(){
    return (
        <Suspense>
            <Consultations/>
        </Suspense>
    )
}