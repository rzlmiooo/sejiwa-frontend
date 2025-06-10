'use client'

import ChatKonselor from "@/app/suspense/chat-konselor"
import { Suspense } from "react"

export default function Chat(){
    return(
        <Suspense>
            <ChatKonselor/>
        </Suspense>
    )
}