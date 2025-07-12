import { Suspense } from "react";
import Dashboard from "../suspense/konselor/konselor-suspense";

export const metadata = {
    title: 'Konselor Dashboard',
    description: 'Pusat Informasi Konseling untuk Konselor',
}

export default function Home(){
    return (
        <Suspense>
            <Dashboard/>
        </Suspense>
    )
}