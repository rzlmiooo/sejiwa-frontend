import ChatKonselor from "@/app/suspense/konselor/chat-konselor"
import { Suspense } from "react"

export default function Chat(){
    return(
        <Suspense>
            <ChatKonselor/>
        </Suspense>
    )
}