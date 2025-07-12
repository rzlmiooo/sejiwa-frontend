import { Suspense } from "react"
import Chat from "@/app/suspense/students/chat"

export const metadata = {
    title: 'Chat Room',
    description: 'Ruang dimana Pelajar dan Konselor saling berinteraksi.',
}

export default function ChatStudent() {
    return (
        <Suspense>
            <Chat />
        </Suspense>
    )
}