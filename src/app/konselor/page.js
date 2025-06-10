import { Suspense } from "react";
import Dashboard from "../suspense/konselor-suspense";

export default function Home(){
    return (
        <Suspense>
            <Dashboard/>
        </Suspense>
    )
}