'use client'

import { Suspense } from "react"
import Chat from "@/app/suspense/students/chat"

export default function ChatStudent() {
    return (
        <Suspense>
            <Chat />
        </Suspense>
    )
}