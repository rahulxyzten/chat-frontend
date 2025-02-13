"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import DotPattern from "@/components/ui/dot-pattern";
import LoginCard from "@/components/card/LoginCard";
import { Layers } from "lucide-react";

export default function Login() {
    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    const Icon = Layers;

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                "http://localhost:1337/api/auth/local",
                {
                    identifier,
                    password,
                }
            );
            localStorage.setItem("token", response.data.jwt);
            router.push("/chat");
        } catch (error) {
            console.error("Login error:", error);
        }
    };

    return (
        <div className="min-h-96 relative flex items-center justify-center px-6 py-32 mt-24">
            <div className="z-10">
                <LoginCard
                    key={1}
                    gradientColor="var(--jungle--green)"
                    assetBackground="var(--bush)"
                    titleBackground="var(--black--bean)"
                    titleLabel="Login"
                    identifier={identifier}
                    password={password}
                    setIdentifier={setIdentifier}
                    setPassword={setPassword}
                    onSubmit={handleLogin}
                >
                    <Icon className="size-4" />
                </LoginCard>
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
