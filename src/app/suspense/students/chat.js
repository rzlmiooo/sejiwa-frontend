"use client";

import axios from "axios";
import { useEffect, useRef, useState } from 'react';
import { io } from "socket.io-client";
import { getStudentId } from "@/app/utils/auth/auth";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import Back from "@/app/components/back";

export default function Chat() {
    useEffect(() => {
        return () => {
          localStorage.removeItem('activeRoomId');
          console.log('Room ID removed from localStorage');
        };
    }, []);

    const [isOpen, setIsOpen] = useState(false);
    const menuButtonRef = useRef(null);
    const menuDropdownRef = useRef(null);
    const [roomId, setRoomId] = useState("");
    const [inputRoomId, setInputRoomId] = useState("");
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [roomCode, setRoomJoin] = useState([]);
    const messagesEndRef = useRef();
    const senderId = getStudentId();
    const [error, setError] = useState("");
    const sessionId = `session-${roomId}`;
    const [loading, setLoading] = useState(false);
    const searchParams = useSearchParams();
    const studentId = searchParams.get('student_id');
    const counselorId = searchParams.get('counselor_id');
    const isValid = studentId && counselorId;
    
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

    const socketRef = useRef(null);

    const router = useRouter();

    const handleSelect = () => {
        router.push(`/home/chat/chat-pelajar`);
    };

    useEffect(() => {
        const storedRoomId = localStorage.getItem("activeRoomId");
        if (storedRoomId) {
          setRoomId(String(storedRoomId).trim());
        } else {
          console.warn("Room ID kosong di localStorage");
        }
    }, []);

    useEffect(() => {
        if (!roomId || socketRef.current) return;

        socketRef.current = io("https://sejiwa.onrender.com", {
            path: "/socket.io",
            autoConnect: true,
            transports: ["websocket"],
            auth: {
                token: localStorage.getItem("token"),
                sessionId: roomId,
            },
        });

        socketRef.current.on("connect", () => {
            console.log("Connected:", socketRef.current.id);
            socketRef.current.emit("join", { roomId });
        });

        socketRef.current.on("chat-message", (data) => {
            console.log("Received message from socket:", data);
            setMessages((prev) => [...prev, data]);
        });

        
        return () => {
            socketRef.current?.disconnect();
            socketRef.current = null;
        };
    }, [roomId]);
    
    const handleCreateRoom = async (e) => {
        if (!token) return;

        const payload = {
            title: title,
            student_id: String(studentId).trim(),
            counselor_id: String(counselorId).trim()
        };

        console.log(payload);
        

        try {
            const res = await axios.post(`https://sejiwa.onrender.com/api/chats/rooms`, payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            console.log('POST response:', res.data);

            if (res.status === 201 || res.status === 200) {
                const newRoomId = String(res.data.id).trim();
                console.log('New Room ID:', newRoomId);
                localStorage.setItem("activeRoomId", newRoomId);
                setRoomId(newRoomId);
                handleSelect();
            } else {
                console.error('Failed to create room:', res.status);
            }
        } catch (err) {
            console.error('Chat request failed:', err);
        }
    };

    const handleJoinRoom = () => {
        if (inputRoomId.trim()) {
            setRoomId(inputRoomId.trim());
        }
    };

    const handleExit = () => {
        localStorage.removeItem("activeRoomId");
        window.location.href = "/home/chat/chat-pelajar";
    };

    const sendMessage = () => {
        if (!socketRef.current || !socketRef.current.on) {
            console.warn("Socket belum connect!");
            alert("⚠️ Koneksi belum siap. Coba lagi setelah sinyal stabil.");
            return;
        }

        if (message.trim() && socketRef.current) {
            console.log("Sending message:", message);
            socketRef.current.emit("chat-message", {
                room_id: roomId,
                sender_id: senderId,
                sender_role: "User",
                message: message,
            });
            setMessage("");
        }
    };

    useEffect(() => {
        if (!token) return;

        const fetchRoomUser = async () => {
            try {
                const roomsRes = await axios.get('https://sejiwa.onrender.com/api/chats/rooms', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                const allRooms = roomsRes.data || [];

                const roomUser = allRooms.filter(
                    (room) => room.student_id === senderId
                );
                
                console.log(roomUser);

                setRoomJoin(roomUser);
            } catch (err) {
                console.error('Error fetching rooms', err);
            } finally {
                setLoading(false);
            }
        };

        fetchRoomUser();
    }, [token, studentId]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div className="flex-1 flex-col text-gray-900 dark:text-sky-50 p-8 pr-22 sm:pr-6 w-full mx-auto">
            <h1 className="text-3xl font-bold mb-4">Chat</h1>
            {!roomId && (
            <>
                <div className="my-6 space-y-2 w-full">
                    <input
                    className="w-full md:w-100 px-4 py-2 border border-gray-300 rounded"
                    placeholder="Buat Room baru, masukkan judul Room"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    />

                    {isValid ? (
                        <button
                            onClick={handleSubmit}
                            className="w-full md:w-100 px-4 py-2 rounded bg-green-600 hover:bg-green-700 text-white font-semibold transition"
                        >
                            Booking Sekarang
                        </button>
                        ) : (
                        <div
                            className="w-full md:w-100 px-4 py-2 rounded bg-gray-600 text-white font-semibold cursor-not-allowed text-center"
                        >
                            Anda Belum Booking
                        </div>
                    )}

                </div>
                <div className="w-full md:w-100 mt-10 text-gray-900 dark:text-sky-50">
                    <span className="text-xl font-bold text-lime-300 pr-2">Perhatian!</span>
                    Kalau Anda sebelumnya sudah melakukan Booking, silahkan masukkan Room ID yang didapat setelah booking.
                </div>
                <div className="flex my-2 gap-2 text-sm text-gray-900 dark:text-sky-50">
                    Room ID sebelumnya:
                    {roomCode?.length > 0 ? (
                        <h2>{roomCode[roomCode.length - 1].id}</h2>
                        ) : (
                        <p>No rooms found.</p>
                    )}
                </div>
                <div className="mb-10 space-y-2 w-full md:w-100">
                    <input
                    className="w-full px-4 py-2 border border-gray-300 rounded"
                    placeholder="Masukkan Room ID"
                    value={inputRoomId}
                    onChange={(e) => setInputRoomId(e.target.value)}
                    />
                    <button
                    onClick={handleJoinRoom}
                    className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                    >
                    Join Room
                    </button>
                </div>
                <Back />
            </>
            )}
            {roomId && (
                <>
                <button
                onClick={handleExit}
                className="inline-flex items-center gap-2 px-4 py-2 bg-sky-600 hover:bg-sky-500 text-sky-50 rounded-xl transition"
            >
                <ArrowLeftIcon className="w-4 h-4" />
                <span>Kembali</span>
                </button>
                <h2 className="text-lg font-bold mt-4 mb-4">
                    Room ID: <strong>{roomId}</strong> — <span className="font-light">ingat Room ID ini agar bisa melanjutkan kembali chat dengan Konselor yang sama.</span>
                </h2>
                <div className="border border-gray-300 p-4 h-[300px] overflow-y-auto mb-4 rounded bg-sky-50 dark:bg-gray-800">
                    {messages.map((msg, idx) => (
                    <div key={idx} className={`flex items-center mb-2 ${msg.sender_role === 'User' ? 'justify-end' : 'justify-start'}`}>
                        <span
                            className={`flex flex-col text-xs font-medium mr-2 px-2.5 py-0.5 rounded-sm
                              ${msg.sender_role === 'User' 
                                ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100' 
                                : 'bg-blue-100 dark:bg-gray-600 text-blue-800 dark:text-blue-100'}
                            `}
                        >
                            {msg.sender_role === 'User' ? 'Anda' : 'Konselor'}
                            <span className="text-sm sm:text-lg text-sky-800 dark:text-sky-50">{msg.message}</span>
                            <div className="text-[10px] text-gray-400 mt-1">
                                {new Date(msg.timestamp).toLocaleTimeString('id-ID', {
                                hour: '2-digit',
                                minute: '2-digit',
                                hour12: false,
                                })}
                            </div>
                        </span>
                    </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>
                <div className="flex items-center gap-0 px-4 py-2 border border-gray-300 rounded">
                    <input
                    className="flex-1 border-none focus:outline-none"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Your message..."
                    onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                    />
                    <button
                    onClick={sendMessage}
                    className="flex justify-center items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                    >
                    <span className="hidden sm:inline">Kirim</span> <PaperAirplaneIcon className="h-5 w-5 transform" />
                    </button>
                </div>
                </>
            )}
        </div>
    )
}