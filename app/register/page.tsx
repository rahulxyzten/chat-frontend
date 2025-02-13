"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import DotPattern from "@/components/ui/dot-pattern";
import RegisterCard from "@/components/card/RegisterCard";
import { Package } from "lucide-react"; 

export default function Signup() {
    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const Icon = Package; // Example icon

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/auth/local/register`,
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
            setError("Signup failed. Please check your details.");
        }
    };

    return (
        <div className="min-h-96 relative flex items-center justify-center px-6 py-32 mt-24">
            <div className="z-10">
                <RegisterCard
                    gradientColor="var(--rose-of--sharon)"
                    assetBackground="var(--rose-of--sharon-2)"
                    titleBackground="var(--rose-of--sharon-2)"
                    titleLabel="Sign Up"
                    username={username}
                    email={email}
                    password={password}
                    setUsername={setUsername}
                    setEmail={setEmail}
                    setPassword={setPassword}
                    onSubmit={handleSignup}
                    error={error}
                >
                    <Icon className="size-4" />
                </RegisterCard>
            </div>
            <DotPattern
                width={20}
                height={20}
                cx={1}
                cy={1}
                cr={1}
                className="dot-pattern opacity-50"
            />
        </div>
    );
}
