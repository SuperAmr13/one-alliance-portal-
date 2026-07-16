"use client";

import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";

type User = {
  inGameName: string;
  role: "OWNER" | "R5" | "R4" | "MEMBER";
};

export default function Hero() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-5xl md:text-7xl font-bold text-blue-400">
        ONe Nation Elite
      </h1>

      <p className="mt-6 text-xl text-gray-300 italic">
        ONe for All, All for ONe
      </p>

      {user ? (
        <>
          <p className="mt-8 text-2xl text-white">
            Welcome, <span className="text-blue-400">{user.inGameName}</span>
          </p>

          <div className="mt-8">
            {(user.role === "OWNER" ||
              user.role === "R5" ||
              user.role === "R4") ? (
              <Button href="/admin">
                Go to Admin Dashboard
              </Button>
            ) : (
              <Button href="/portal">
                Go to Portal
              </Button>
            )}
          </div>
        </>
      ) : (
        <div className="mt-10 flex gap-4">
          <Button href="/login">
            Enter Portal
          </Button>

          <Button href="/register" variant="secondary">
            Request Access
          </Button>
        </div>
      )}
    </section>
  );
}