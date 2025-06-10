import Link from 'next/link'
import { Bars3Icon } from '@heroicons/react/24/solid'
import { useEffect, useState } from 'react';
import { AuthService } from '../service/AuthService';

export default function Leftbar() {
    const [error, setError] = useState("");
    
    const logout = async (e) => {
        e.preventDefault();
        setError("");
        try {
            await AuthService.logout(); 
            console.log("Logout Successful");
            await router.push("/"); 
        } catch (err) {
            console.error("Logout error:", err?.response?.data || err.message);
            setError(err?.response?.data?.message || "Logout failed");
        }
    };

    return (
        <div>
             <aside className="w-64 bg-white h-full p-4 shadow">
                <div>
                    <img src="/icon.png" alt="" className="w-24 h-auto" />
                </div>
                <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                    <ul className="space-y-2 font-medium">
                        <li>
                            <Link
                                href="/konselor/"
                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                            >
                                <svg
                                    className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-blue-900 dark:group-hover:text-white"
                                    aria-hidden="true"
                                    fill="currentColor"
                                    viewBox="0 0 22 21"
                                >
                                    <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                                    <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                                </svg>
                                <span className="ms-3">Dashboard</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/konselor/bookings"
                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                            >
                                <svg
                                    className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-blue-500 dark:group-hover:text-white"
                                    fill="currentColor"
                                    viewBox="0 0 30 34"
                                >
                                    <path d="M3.33 34c-.91 0-1.7-.33-2.35-.98A3.29 3.29 0 0 1 0 30.67V7.33c0-.91.33-1.7.98-2.35.65-.65 1.44-.98 2.35-.98h7c.36-1 1-1.8 1.85-2.42A3.47 3.47 0 0 1 15 .67c1.05 0 2 .33 2.85 1 .85.63 1.49 1.42 1.8 2.42h7c.91 0 1.7.33 2.35.98.65.65.98 1.44.98 2.35V30.67c0 .91-.33 1.7-.98 2.35a3.29 3.29 0 0 1-2.35.98H3.33ZM3.33 30.67h23.33V7.33H3.33v23.34Z" />
                                </svg>
                                <span className="flex-1 ms-3 whitespace-nowrap">Bookings</span>
                                <span className="inline-flex items-center justify-center px-2 ms-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">
                                    Pro
                                </span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/konselor/kelola-jadwal"
                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                            >
                                <svg class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-blue-500 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 30 34" >
                                    <path d="M12 26.9999H21.1667C21.6389 26.9999 22.0767 26.8816 22.48 26.6449C22.8833 26.4083 23.1678 26.0821 23.3333 25.6666L26.8333 17.4999C26.8889 17.361 26.9306 17.2221 26.9583 17.0833C26.9861 16.9444 27 16.8055 27 16.6666V15.3333C27 14.861 26.84 14.4649 26.52 14.1449C26.2 13.8249 25.8045 13.6655 25.3333 13.6666H17.6667L18.6667 7.99992C18.7222 7.72214 18.7083 7.45825 18.625 7.20825C18.5417 6.95825 18.4028 6.73603 18.2083 6.54159L17 5.33325L9.33335 13.6666C9.11112 13.8888 8.94446 14.1388 8.83335 14.4166C8.72223 14.6944 8.66668 14.9999 8.66668 15.3333V23.6666C8.66668 24.5833 8.99335 25.3683 9.64668 26.0216C10.3 26.6749 11.0845 27.001 12 26.9999ZM17 33.6666C14.6945 33.6666 12.5278 33.2288 10.5 32.3533C8.47223 31.4777 6.70835 30.2905 5.20835 28.7916C3.70835 27.2927 2.52112 25.5288 1.64668 23.4999C0.772235 21.471 0.334457 19.3044 0.333346 16.9999C0.332235 14.6955 0.770012 12.5288 1.64668 10.4999C2.52335 8.47103 3.71057 6.70714 5.20835 5.20825C6.70612 3.70936 8.47001 2.52214 10.5 1.64659C12.53 0.77103 14.6967 0.333252 17 0.333252C19.3033 0.333252 21.47 0.77103 23.5 1.64659C25.53 2.52214 27.2939 3.70936 28.7917 5.20825C30.2895 6.70714 31.4772 8.47103 32.355 10.4999C33.2328 12.5288 33.67 14.6955 33.6667 16.9999C33.6633 19.3044 33.2256 21.471 32.3533 23.4999C31.4811 25.5288 30.2939 27.2927 28.7917 28.7916C27.2895 30.2905 25.5256 31.4783 23.5 32.3549C21.4745 33.2316 19.3078 33.6688 17 33.6666ZM17 30.3333C20.7222 30.3333 23.875 29.0416 26.4583 26.4583C29.0417 23.8749 30.3333 20.7221 30.3333 16.9999C30.3333 13.2777 29.0417 10.1249 26.4583 7.54159C23.875 4.95825 20.7222 3.66659 17 3.66659C13.2778 3.66659 10.125 4.95825 7.54168 7.54159C4.95835 10.1249 3.66668 13.2777 3.66668 16.9999C3.66668 20.7221 4.95835 23.8749 7.54168 26.4583C10.125 29.0416 13.2778 30.3333 17 30.3333Z" />
                                </svg>
                                <span className="ms-3">Kelola Jadwal</span>
                                <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">3</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/konselor/chat-konselor"
                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                            >
                                <svg class="shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-blue-500 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                    <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
                                </svg>
                                <span className="ms-4">Chat Konselor</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/konselor/riwayat-konsultasi"
                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                            >
                                <svg class="shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-blue-500 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                                    <path d="M6.50002 33.6666C4.88891 33.6666 3.51391 33.0971 2.37502 31.9583C1.23613 30.8194 0.666687 29.4444 0.666687 27.8333V6.16658C0.666687 4.55547 1.23613 3.18047 2.37502 2.04159C3.51391 0.902697 4.88891 0.333252 6.50002 0.333252H27.3334V25.3333C26.6389 25.3333 26.0489 25.5766 25.5634 26.0633C25.0778 26.5499 24.8345 27.1399 24.8334 27.8333C24.8322 28.5266 25.0756 29.1171 25.5634 29.6049C26.0511 30.0927 26.6411 30.3355 27.3334 30.3333V33.6666H6.50002ZM4.00002 22.5416C4.38891 22.3471 4.79169 22.2083 5.20835 22.1249C5.62502 22.0416 6.05558 21.9999 6.50002 21.9999H7.33335V3.66659H6.50002C5.80558 3.66659 5.21558 3.90992 4.73002 4.39659C4.24447 4.88325 4.00113 5.47325 4.00002 6.16658V22.5416ZM10.6667 21.9999H24V3.66659H10.6667V21.9999ZM6.50002 30.3333H22.0417C21.875 29.9444 21.7434 29.5488 21.6467 29.1466C21.55 28.7444 21.5011 28.3066 21.5 27.8333C21.5 27.3888 21.5417 26.9583 21.625 26.5416C21.7084 26.1249 21.8472 25.7221 22.0417 25.3333H6.50002C5.7778 25.3333 5.18058 25.5766 4.70835 26.0633C4.23613 26.5499 4.00002 27.1399 4.00002 27.8333C4.00002 28.5555 4.23613 29.1527 4.70835 29.6249C5.18058 30.0971 5.7778 30.3333 6.50002 30.3333Z" />
                                </svg>
                                <span className="ms-4">Riwayat Konsultasi</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/konselor/profile"
                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                            >
                                <svg width="28" height="28" class="shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-blue-500 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 30 34" >
                                    <path d="M14 14.0001C12.1667 14.0001 10.5972 13.3473 9.29169 12.0417C7.98613 10.7362 7.33335 9.16675 7.33335 7.33341C7.33335 5.50008 7.98613 3.93064 9.29169 2.62508C10.5972 1.31953 12.1667 0.666748 14 0.666748C15.8334 0.666748 17.4028 1.31953 18.7084 2.62508C20.0139 3.93064 20.6667 5.50008 20.6667 7.33341C20.6667 9.16675 20.0139 10.7362 18.7084 12.0417C17.4028 13.3473 15.8334 14.0001 14 14.0001ZM0.666687 27.3334V22.6667C0.666687 21.7223 0.910021 20.8545 1.39669 20.0634C1.88335 19.2723 2.52891 18.6679 3.33335 18.2501C5.05558 17.389 6.80558 16.7434 8.58335 16.3134C10.3611 15.8834 12.1667 15.6679 14 15.6667C15.8334 15.6656 17.6389 15.8812 19.4167 16.3134C21.1945 16.7456 22.9445 17.3912 24.6667 18.2501C25.4722 18.6667 26.1184 19.2712 26.605 20.0634C27.0917 20.8556 27.3345 21.7234 27.3334 22.6667V27.3334H0.666687ZM4.00002 24.0001H24V22.6667C24 22.3612 23.9239 22.0834 23.7717 21.8334C23.6195 21.5834 23.4178 21.389 23.1667 21.2501C21.6667 20.5001 20.1528 19.9379 18.625 19.5634C17.0972 19.189 15.5556 19.0012 14 19.0001C12.4445 18.999 10.9028 19.1867 9.37502 19.5634C7.84724 19.9401 6.33335 20.5023 4.83335 21.2501C4.58335 21.389 4.38169 21.5834 4.22835 21.8334C4.07502 22.0834 3.99891 22.3612 4.00002 22.6667V24.0001ZM14 10.6667C14.9167 10.6667 15.7017 10.3406 16.355 9.68841C17.0084 9.03619 17.3345 8.25119 17.3334 7.33341C17.3322 6.41564 17.0061 5.63119 16.355 4.98008C15.7039 4.32897 14.9189 4.0023 14 4.00008C13.0811 3.99786 12.2967 4.32453 11.6467 4.98008C10.9967 5.63564 10.67 6.42008 10.6667 7.33341C10.6634 8.24675 10.99 9.03175 11.6467 9.68841C12.3034 10.3451 13.0878 10.6712 14 10.6667Z" />
                                </svg>
                                <span className="ms-4">Profile</span>
                            </Link>
                        </li>
                        <li onClick={logout}>
                            <div className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <svg width="14" height="14" class="shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-blue-500 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 30 34">
                                    <path d="M7.04169 15.6667L16.375 25.0001L14 27.3334L0.666687 14.0001L14 0.666748L16.375 3.00008L7.04169 12.3334H27.3334V15.6667H7.04169Z" />
                                </svg>
                                <span className="ms-4">Keluar</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </aside>
        </div>
    )
}