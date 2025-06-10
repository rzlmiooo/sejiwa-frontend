'use client';

import { Suspense } from "react";
import KelolaJadwal from "@/app/suspense/jadwal-suspense";

export default function Jadwal(){
    return (
        <Suspense>
            <KelolaJadwal/>
        </Suspense>
    )
}