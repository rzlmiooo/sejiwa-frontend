"use client";

import axios from "axios";
import { useEffect, useRef, useState } from 'react';
import { io } from "socket.io-client";
import { getStudentId } from "../../utils/auth/auth";
import { useSearchParams } from 'next/navigation';
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";

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
        };
    }, [roomId]);


    const handleJoinRoom = () => {
        if (inputRoomId.trim()) {
            setRoomId(inputRoomId.trim());
        }
    };

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
                    (room) => String(room.student_id) === String(studentId)
                );

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
            {/* {roomCode?.length > 0 ? (
                roomCode.map((room) => (
                    <h2 key={room.id}>Your Room ID: {room.id}</h2>
                ))
            ) : (
                <p>No rooms found.</p>
            )} */}
            {!roomId && (
                <>
                    <div>
                        <input
                            placeholder="Enter room ID diatas"
                            value={inputRoomId}
                            onChange={(e) => setInputRoomId(e.target.value)}
                        />
                        <button onClick={handleJoinRoom}>Join Room</button>
                    </div>
                </>
            )}

            {roomId && (
                // <>
                //     <h2>Room ID: {roomId}</h2>
                //     <div
                //         style={{
                //             border: "1px solid #ccc",
                //             padding: "1rem",
                //             height: "300px",
                //             overflowY: "auto",
                //             marginBottom: "1rem",
                //         }}
                //     >
                //         {messages.map((msg, idx) => (
                //             <div key={idx} className="mb-2">
                //                 {msg.sender_role === "User" && (
                //                     <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-green-900 dark:text-green-300">
                //                         User
                //                     </span>
                //                 )}

                //                 {msg.sender_role === "Konselor" && (
                //                     <span className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-blue-900 dark:text-blue-300">
                //                         Konselor
                //                     </span>
                //                 )}

                //                 <span>{msg.message}</span>
                //             </div>
                //         ))}
                //         <div ref={messagesEndRef} />
                //     </div>

                //     <div>
                //         <input
                //             value={message}
                //             onChange={(e) => setMessage(e.target.value)}
                //             placeholder="Your message..."
                //             onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                //         />
                //         <button onClick={sendMessage}>Send</button>
                //     </div>
                // </>
<>
                <h2 className="text-lg font-bold mt-4 mb-4">
                    Room ID: <strong>{roomId}</strong> — <span className="font-light">ingat Room ID ini agar bisa melanjutkan kembali chat dengan Pelajar yang sama.</span>
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