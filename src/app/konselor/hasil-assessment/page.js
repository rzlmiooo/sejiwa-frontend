import HasilAssessment from "@/app/suspense/konselor/hasil-assessment-suspense";
import { Suspense } from "react";

export default function Hasil() {
    return (
        <Suspense>
            <HasilAssessment />
        </Suspense>
    )
}