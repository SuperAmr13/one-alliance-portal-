"use client";

import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";

type User = {
  id: string;
  playerId: string;
  inGameName: string;
  role: "OWNER" | "R5" | "R4" | "MEMBER";
};

export default function Hero() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      try {
        const res = await fetch("/api/me", {
          credentials: "include",
          cache: "no-store",
        });

        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, []);

  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center text-white">
        Loading...
      </section>
    );
  }

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
            Welcome,{" "}
            <span className="text-blue-400">{user.inGameName}</span>
          </p>

          <div className="mt-10 flex gap-4 flex-wrap justify-center">
            <Button href="/portal">
              Portal
            </Button>

            {(user.role === "OWNER" ||
              user.role === "R5" ||
              user.role === "R4") && (
              <Button href="/admin">
                Admin Dashboard
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