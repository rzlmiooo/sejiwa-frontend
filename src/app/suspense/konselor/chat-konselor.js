"use client";

import axios from "axios";
import { useEffect, useRef, useState } from 'react';
import { io } from "socket.io-client";
import { getStudentId } from "../../utils/auth/auth";
import { useSearchParams } from 'next/navigation';

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
        <div style={{ padding: "2rem", maxWidth: "600px", margin: "auto" }}>
            <h1>Sejiwa Chat App</h1>
            {roomCode?.length > 0 ? (
                roomCode.map((room) => (
                    <h2 key={room.id}>Your Room ID: {room.id}</h2>
                ))
            ) : (
                <p>No rooms found.</p>
            )}
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
                <>
                    <h2>Room ID: {roomId}</h2>
                    <div
                        style={{
                            border: "1px solid #ccc",
                            padding: "1rem",
                            height: "300px",
                            overflowY: "auto",
                            marginBottom: "1rem",
                        }}
                    >
                        {messages.map((msg, idx) => (
                            <div key={idx} className="mb-2">
                                {msg.sender_role === "User" && (
                                    <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-green-900 dark:text-green-300">
                                        User
                                    </span>
                                )}

                                {msg.sender_role === "Konselor" && (
                                    <span className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-blue-900 dark:text-blue-300">
                                        Konselor
                                    </span>
                                )}

                                <span>{msg.message}</span>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    <div>
                        <input
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Your message..."
                            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                        />
                        <button onClick={sendMessage}>Send</button>
                    </div>
                </>
            )}
        </div>
    );
}