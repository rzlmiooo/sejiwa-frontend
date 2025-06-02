'use client'
import { usePathname } from "next/navigation"

export default function Path(){
    const path = usePathname();
    let pathName = '';
    if (path == '/home') {
        pathName = 'Beranda';
    } if (path == '/home/assessment') {
        pathName = 'Assessment';
    } if (path == '/home/recommendation') {
        pathName = 'Rekomendasi';
    } if (path == '/home/chat') {
        pathName = 'Chat Konselor';
    } if (path == '/home/settings') {
        pathName = 'Pengaturan';
    }

    return pathName; 
}