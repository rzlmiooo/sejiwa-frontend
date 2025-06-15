import { Suspense } from "react";
import KelolaJadwal from "@/app/suspense/konselor/jadwal-suspense";

export default function Jadwal(){
    return (
        <Suspense>
            <KelolaJadwal/>
        </Suspense>
    )
}