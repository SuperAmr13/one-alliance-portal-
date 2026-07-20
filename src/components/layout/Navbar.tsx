"use client";

import { useEffect, useState } from "react";

type User = {
  id: string;
  playerId: string;
  inGameName: string;
  role: "OWNER" | "R5" | "R4" | "MEMBER";
};

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);

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
      }
    }

    loadUser();
  }, []);

  async function logout() {
    await fetch("/api/logout", {
      method: "POST",
      credentials: "include",
    });

    window.location.href = "/login";
  }

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/30 backdrop-blur-md border-b border-blue-500/20">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">

        <h1 className="text-lg sm:text-xl font-bold text-blue-400 truncate">
          {user ? user.inGameName : "ONe"}
        </h1>

        {user ? (
          <button
            onClick={logout}
            className="rounded-lg bg-red-600 hover:bg-red-700 px-4 py-2 text-white text-sm font-semibold transition"
          >
            Log Out
          </button>
        ) : null}

      </div>
    </nav>
  );
}