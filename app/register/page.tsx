"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Signup() {
    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                "http://localhost:1337/api/auth/local/register",
                {
                    username,
                    email,
                    password,
                }
            );
            // store the JWT token for authentication
            localStorage.setItem("token", response.data.jwt);
            router.push("/chat");
        } catch (err: any) {
            console.error("Error signing up:", err);
            setError("Signup failed. Please check your details and try again.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form
                onSubmit={handleSignup}
                className="p-6 bg-white rounded shadow-md w-full max-w-sm"
            >
                <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>

                {error && <div className="mb-4 text-red-500 text-center">{error}</div>}

                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="border p-2 mb-4 w-full rounded text-black"
                    required
                />

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border p-2 mb-4 w-full rounded text-black"
                    required
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border p-2 mb-6 w-full rounded text-black"
                    required
                />

                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white w-full py-2 rounded"
                >
                    Sign Up
                </button>
            </form>
        </div>
    );
}
