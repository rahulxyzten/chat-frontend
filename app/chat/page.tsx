"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
    id: string;
    email: string;
}

export default function Chat() {
    const [message, setMessage] = useState("");
    const [chat, setChat] = useState<string[]>([]);
    const ws = useRef<WebSocket | null>(null);
    const [userId, setUserId] = useState<string | null>(null);
    const [isClient, setIsClient] = useState(false); // Prevent SSR hydration issues
    const router = useRouter();

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (!isClient) return;

        const token = localStorage.getItem("token");
        if (!token) {
            router.push("/");
            return;
        }

        try {
            const decoded: DecodedToken = jwtDecode(token);
            setUserId(decoded.id);

            // Load user-specific chat history
            const storedChat = localStorage.getItem(`chatHistory_${decoded.id}`);
            if (storedChat) {
                setChat(JSON.parse(storedChat));
            }
        } catch (error) {
            console.error("Invalid token", error);
            router.push("/");
        }

        // Establish WebSocket connection
        connectWebSocket();

        return () => {
            ws.current?.close();
        };
    }, [isClient]);

    useEffect(() => {
        if (userId) {
            localStorage.setItem(`chatHistory_${userId}`, JSON.stringify(chat));
        }
    }, [chat, userId]);

    if (!isClient) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                Loading...
            </div>
        );
    }

    const connectWebSocket = () => {
        ws.current = new WebSocket("ws://localhost:8080");

        ws.current.onopen = () => {
            console.log("WebSocket connected");
        };

        ws.current.onmessage = (event) => {
            console.log("Message from server:", event.data);
            setChat((prevChat) => [...prevChat, `${event.data}`]);
        };

        ws.current.onerror = (event) => {
            console.log(
                "WebSocket error, readyState:",
                ws.current?.readyState,
                event
            );
        };

        ws.current.onclose = () => {
            console.log("WebSocket closed. Reconnecting in 3 seconds...");
            setTimeout(connectWebSocket, 3000);
        };
    };

    const sendMessage = () => {
        if (
            ws.current &&
            ws.current.readyState === WebSocket.OPEN &&
            message.trim() !== ""
        ) {
            ws.current.send(message);
            setChat((prevChat) => [...prevChat, `You: ${message}`]);
            setMessage("");
        } else {
            console.warn("WebSocket not connected. Cannot send message.");
        }
    };

    const handleLogout = () => {
        if (userId) {
            localStorage.setItem(`chatHistory_${userId}`, JSON.stringify(chat));
        }
        localStorage.removeItem("token");
        router.push("/");
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center p-4">
            <div className="w-full max-w-md bg-white shadow rounded p-4 mb-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Chat</h2>
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                        Logout
                    </button>
                </div>
                <div className="h-64 overflow-y-auto mb-4 border p-2 rounded text-black">
                    {chat.map((msg, idx) => (
                        <div key={idx} className="mb-2">
                            {msg}
                        </div>
                    ))}
                </div>
                <div className="flex">
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type your message..."
                        className="flex-1 border p-2 rounded-l text-black"
                    />
                    <button
                        onClick={sendMessage}
                        className="bg-blue-500 text-white px-4 rounded-r"
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
}
