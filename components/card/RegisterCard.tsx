"use client";

import { useState } from "react";
import { MagicCard } from "../ui/magic-card";
import { Button } from "../ui/button";

type RegisterCardProps = {
  gradientColor: string;
  assetBackground: string;
  titleBackground: string;
  titleLabel: string;
  username: string;
  email: string;
  password: string;
  setUsername: (value: string) => void;
  setEmail: (value: string) => void;
  setPassword: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  error?: string | null;
  children: React.ReactNode;
};

export default function RegisterCard({
  gradientColor,
  assetBackground,
  titleBackground,
  titleLabel,
  username,
  email,
  password,
  setUsername,
  setEmail,
  setPassword,
  onSubmit,
  error,
  children,
}: RegisterCardProps) {
  const [hoveredId, setHoveredId] = useState("");

  return (
    <MagicCard
      className="w-[400px] md:w-[500px] cursor-pointer border-none bg-[#1a1a1a6c] p-5 shadow-xl"
      gradientColor={gradientColor}
      gradientOpacity={0.25}
    >
      <div
        className="grid w-fit items-center rounded-full p-2"
        style={{
          color: gradientColor,
          backgroundColor: assetBackground,
        }}
      >
        {children}
      </div>

      <div
        className="text-code mb-4 mt-3 w-fit rounded-lg p-2 text-whiteice"
        style={{ backgroundColor: titleBackground }}
      >
        <h3>{titleLabel}</h3>
      </div>

      {/* Registration Form */}
      <form
        onSubmit={onSubmit}
        className="flex relative w-full flex-col gap-4 justify-center content-center"
      >
        
        {error && <div className="text-red-500 text-sm max-w-72">{error}</div>}

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border w-full p-2 rounded bg-[#1a1a1a6c] text-whiteice text-md custom-width"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border w-full p-2 rounded bg-[#1a1a1a6c] text-whiteice text-md custom-width"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded bg-[#1a1a1a6c] text-whiteice text-md custom-width"
          required
        />

        <Button
          type="submit"
          style={{
            backgroundColor:
              hoveredId === "1" ? "rgba(67,20,7)" : "rgba(154,52,18,0.5)",
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
}
