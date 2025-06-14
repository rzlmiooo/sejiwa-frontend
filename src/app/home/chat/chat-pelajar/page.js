"use client";

import axios from "axios";
import { useEffect, useRef, useState } from 'react';
import { io } from "socket.io-client";
import { getStudentId } from "@/app/utils/auth/auth";

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
                setRoomId(newRoomId);
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
        <div style={{ color: "#1b1b1b", padding: "2rem", maxWidth: "600px", margin: "auto" }}>
            <h1>Sejiwa Chat App</h1>

            {!roomId && (
                <>
                    <div style={{ marginBottom: "1rem" }}>
                        <input
                            placeholder="Room title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <button onClick={handleCreateRoom}>Create Room</button>
                    </div>

                    <div>
                        <input
                            placeholder="Enter room ID"
                            value={inputRoomId}
                            onChange={(e) => setInputRoomId(e.target.value)}
                        />
                        <button onClick={handleJoinRoom}>Join Room</button>
                    </div>
                </>
            )}

            {roomId && (
                <>
                    <h2>Your Room ID is <strong>{roomId}</strong> save it to join later if conselor come in</h2>
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
            )
            }
        </div >
    );
}