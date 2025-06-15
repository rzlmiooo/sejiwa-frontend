import { Suspense } from "react";
import Profile from "@/app/suspense/konselor/profile-suspense";

export default function ProfilePage(){
    return (
        <Suspense>
            <Profile/>
        </Suspense>
    )
}