import { Suspense } from "react";
import Profile from "@/app/suspense/profile-suspense";

export default function ProfilePage(){
    return (
        <Suspense>
            <Profile/>
        </Suspense>
    )
}