"use client";

import axios from "axios";
import { useEffect, useRef, useState } from 'react';
import { io } from "socket.io-client";
import { getStudentId } from "../../utils/auth/auth";
import { useSearchParams } from 'next/navigation';
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

export default function ChatKonselor() {
    const [isOpen, setIsOpen] = useState(false);
    const searchParams = useSearchParams();
    const menuButtonRef = useRef(null);
    const menuDropdownRef = useRef(null);
    const [roomId, setRoomId] = useState("");
    const [roomCode, setRoomJoin] = useState([]);
    const [inputRoomId, setInputRoomId] = useState("");
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const messagesEndRef = useRef();
    const senderId = getStudentId();
    const [error, setError] = useState("");
    const studentId = searchParams.get('student_id');
    const [loading, setLoading] = useState(false);
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    const socketRef = useRef(null);

    useEffect(() => {
        const stored = localStorage.getItem("activeRoomId");
        if (stored) {
          setRoomId(stored);
        } else {
          console.log("Room ID tidak ditemukan.");
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
            console.log("Message received from server:", data);
            setMessages((prev) => [...prev, data]);
        });

        socketRef.current.on("connect_error", (err) => {
            console.error("Connection error:", err.message);
        });

        return () => {
            socketRef.current?.disconnect();
            socketRef.current = null;
            localStorage.removeItem("activeRoomId");
        };
    }, [roomId]);


    const handleJoinRoom = () => {
        if (inputRoomId.trim()) {
            setRoomId(inputRoomId.trim());
        }
    };
    
    const handleExit = () => {
        localStorage.removeItem("activeRoomId");
        window.location.href = "/konselor/chat-konselor"; // ganti sesuai path lo
    };
    
    console.log(roomCode)

    const sendMessage = () => {
        if (message.trim() && socketRef.current) {
            console.log("Sending message:", message);
            socketRef.current.emit("chat-message", {
                room_id: roomId,
                sender_id: senderId,
                sender_role: "Konselor",
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
        <div className="text-gray-900 dark:text-sky-50 p-8 pr-22 sm:pr-6 w-full mx-auto">
            <h1 className="text-2xl font-bold mb-4">Sejiwa Chat App</h1>
            <div className="flex gap-2 text-xs text-gray-900 dark:text-sky-50">
                Room ID tersedia:
                {roomCode?.length > 0 ? (
                    <h2>{roomCode[roomCode.length - 1].id}</h2>
                    ) : (
                    <p>No rooms found.</p>
                )}
            </div>
            
            {!roomId && (
                <>
                    <div className="my-5">
                        <span className="mr-2">Room ID:</span>
                        <input
                            placeholder="Pilih dari room ID diatas"
                            value={inputRoomId}
                            onChange={(e) => setInputRoomId(e.target.value)}
                            className="text-lg border-none focus:outline-none"
                            onKeyDown={(e) => e.key === 'Enter' && handleJoinRoom()}
                        />
                        <button onClick={handleJoinRoom} className="p-2 rounded-2xl bg-sky-600 hover:bg-sky-500">Join Room</button>
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
                    Room ID: <strong>{roomId}</strong> — <span className="font-light">ingat Room ID ini agar bisa melanjutkan kembali Chat dengan Pelajar yang sama.</span>
                </h2>
                <div className="border border-gray-300 p-4 h-[300px] overflow-y-auto mb-4 rounded bg-sky-50 dark:bg-gray-800">
                    {messages.map((msg, idx) => (
                    <div key={idx} className={`flex items-center mb-2 ${msg.sender_role === 'Konselor' ? 'justify-end' : 'justify-start'}`}>
                        <span
                            className={`flex flex-col text-xs font-medium mr-2 px-2.5 py-0.5 rounded-sm
                              ${msg.sender_role === 'Konselor' 
                                ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100' 
                                : 'bg-blue-100 dark:bg-gray-600 text-blue-800 dark:text-blue-100'}
                            `}
                        >
                            {msg.sender_role === 'Konselor' ? 'Anda' : 'Pelajar'}
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
    );
}