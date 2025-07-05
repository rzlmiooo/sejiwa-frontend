"use client";

import axios from "axios";
import { useEffect, useRef, useState } from 'react';
import { io } from "socket.io-client";
import { getStudentId } from "@/app/utils/auth/auth";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

export default function Chat() {
    const [isOpen, setIsOpen] = useState(false);
    const menuButtonRef = useRef(null);
    const menuDropdownRef = useRef(null);
    const [roomId, setRoomId] = useState("");
    const [inputRoomId, setInputRoomId] = useState("");
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const messagesEndRef = useRef();
    const senderId = getStudentId();
    const [error, setError] = useState("");
    const sessionId = `session-${roomId}`;

    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

    const socketRef = useRef(null);

    const router = useRouter();

    const handleSelect = () => {
        router.push(`/home/chat/chat-pelajar`);
    };

    useEffect(() => {
        const storedRoomId = localStorage.getItem("activeRoomId");
        if (storedRoomId) {
          setRoomId(storedRoomId);
      
          // Emit join room socket
          socketRef.current?.emit("join", { roomId: storedRoomId });
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
            student_id: senderId,
            title: title
        };

        try {
            const res = await axios.post(`https://sejiwa.onrender.com/api/chats/rooms`, payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            });

            console.log('POST response:', res.data);

            if (res.status === 201 || res.status === 200) {
                const newRoomId = res.data.id;
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
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div className="text-gray-900 dark:text-sky-50 p-8 pr-22 sm:pr-6 w-full mx-auto">
            <h1 className="text-2xl font-bold mb-4">Sejiwa Chat App</h1>
            {!roomId && (
            <>
                <div className="mb-4 space-y-2">
                    <input
                    className="w-full px-4 py-2 border border-gray-300 rounded"
                    placeholder="Room title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    />
                    <button
                    onClick={handleCreateRoom}
                    className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                    >
                    Create Room
                    </button>
                </div>
                <div className="space-y-2">
                    <input
                    className="w-full px-4 py-2 border border-gray-300 rounded"
                    placeholder="Enter room ID"
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