'use client'

import ChatKonselor from "@/app/service/chat-konselor"
import { Suspense } from "react"

export default function Chat(){
    return(
        <Suspense>
            <ChatKonselor/>
        </Suspense>
    )
}