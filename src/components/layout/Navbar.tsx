"use client";

import { useEffect, useState } from "react";

type User = {
  id: string;
  playerId: string;
  inGameName: string;
  role: "OWNER" | "R5" | "R4" | "MEMBER";
  profileImageUrl?: string | null;
};

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const [avatar, setAvatar] = useState<string | null>(null);

  useEffect(() => {
    async function loadUser() {
      try {
        const res = await fetch("/api/me", {
          credentials: "include",
          cache: "no-store",
        });

        if (!res.ok) return;

        const data = await res.json();
        setUser(data.user);

        const avatarRes = await fetch("/api/profile/avatar", {
          credentials: "include",
          cache: "no-store",
        });

        if (avatarRes.ok) {
          const avatarData = await avatarRes.json();
          setAvatar(avatarData.url);
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

        <div className="flex items-center gap-3">

          {avatar ? (
            <img
              src={avatar}
              alt="Avatar"
              className="h-10 w-10 rounded-full object-cover border border-blue-500"
            />
          ) : (
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-700 font-bold">
              {user?.inGameName?.charAt(0).toUpperCase() ?? "O"}
            </div>
          )}

          <h1 className="text-lg sm:text-xl font-bold text-blue-400 truncate">
            {user ? user.inGameName : "ONe"}
          </h1>

        </div>

        {user && (
          <button
            onClick={logout}
            className="rounded-lg bg-red-600 hover:bg-red-700 px-4 py-2 text-white text-sm font-semibold transition"
          >
            Log Out
          </button>
        )}

      </div>
    </nav>
  );
}