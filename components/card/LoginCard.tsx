"use client";

import { useState } from "react";
import { MagicCard } from "../ui/magic-card";
import { Button } from "../ui/button";

type SkillCardProps = {
    gradientColor: string;
    assetBackground: string;
    titleBackground: string;
    titleLabel: string;
    identifier: string;
    password: string;
    setIdentifier: (value: string) => void;
    setPassword: (value: string) => void;
    onSubmit: (e: React.FormEvent) => void;
    children: React.ReactNode;
};

const LoginCard = ({
    gradientColor,
    assetBackground,
    titleBackground,
    titleLabel,
    identifier,
    password,
    setIdentifier,
    setPassword,
    onSubmit,
    children,
}: SkillCardProps) => {
    const [hoveredId, setHoveredId] = useState("");

    return (
        <MagicCard
            className={`w-[400px] md:w-[500px] cursor-pointer border-none bg-[#1a1a1a6c] p-5 shadow-xl`}
            gradientColor={gradientColor}
            gradientOpacity={0.25}
        >
            <div
                className={`grid w-fit items-center rounded-full p-2`}
                style={{
                    color: `${gradientColor}`,
                    backgroundColor: `${assetBackground}`,
                }}
            >
                {children}
            </div>

            <div
                className={`text-code mb-4 mt-3 w-fit rounded-lg p-2 text-whiteice`}
                style={{ backgroundColor: `${titleBackground}` }}
            >
                <h3>{titleLabel}</h3>
            </div>

            {/* Login Form */}
            <form
                onSubmit={onSubmit}
                className="flex relative w-full flex-col gap-4 justify-center content-center"
            >
                <input
                    type="text"
                    placeholder="Email or Username"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    className="border w-full p-2 rounded bg-[#1a1a1a6c] text-whiteice custom-width text-md"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border p-2 rounded bg-[#1a1a1a6c]  text-whiteice custom-width text-md"
                />
                <Button
                    type="submit"
                    style={{
                        backgroundColor: `${hoveredId === "1" ? "rgba(5,46,22)" : "rgba(22,101,52,0.5)"
                            }`,
                    }}
                    onMouseEnter={() => setHoveredId("1")}
                    onMouseLeave={() => setHoveredId("")}
                    className="transition-all text-code custom-width md:w-1/2 md:ml-auto"
                >
                    submit
                </Button>
            </form>
        </MagicCard>
    );
};
export default LoginCard;
