"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { BsFillAirplaneFill } from "react-icons/bs";
import DotPattern from "@/components/ui/dot-pattern";

interface DecodedToken {
    id: string;
    email: string;
}

export default function Chat() {
    const [message, setMessage] = useState("");
    const [chat, setChat] = useState<string[]>([]);
    const ws = useRef<WebSocket | null>(null);
    const [userId, setUserId] = useState<string | null>(null);
    const [isClient, setIsClient] = useState(false); // Prevent the SSR hydration issues
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
        ws.current = new WebSocket(`${process.env.NEXT_PUBLIC_WS_URL}`);

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
        <div className="min-h-screen flex flex-col justify-center items-center mt-24 text-whiteice relative">
            <div className="w-full mb-16 md:mb-24 max-w-2xl bg-gray-800 shadow-lg rounded-lg p-4 relative">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold text-code">Chat Room</h3>
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 text-whiteice px-3 py-1 rounded text-code"
                    >
                        Logout
                    </button>
                </div>
                <div className="h-96 overflow-y-auto mb-4 p-2 border border-gray-600 rounded  bg-gray-700">
                    {chat.map((msg, idx) => (
                        <div key={idx} className="mb-2 text-sm text-whiteice">
                            {msg}
                        </div>
                    ))}
                </div>
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type your message..."
                        className="flex-1 border p-2 rounded-l bg-gray-700 text-whiteice"
                    />
                    <button
                        onClick={sendMessage}
                        className="bg-blue-500 text-whiteice px-4 rounded-r"
                    >
                        <span className="hidden md:inline text-code">Send {" "} </span>
                        <BsFillAirplaneFill className="inline" />
                    </button>
                </div>
            </div>
            <DotPattern
                width={20}
                height={20}
                cx={1}
                cy={1}
                cr={1}
                className="absolute top-0 left-0 opacity-30"
            />
        </div>
    );
}
