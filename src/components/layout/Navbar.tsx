"use client";

import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";

type User = {
  inGameName: string;
  role: "OWNER" | "R5" | "R4" | "MEMBER";
};

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  function logout() {
    localStorage.removeItem("user");
    window.location.href = "/login";
  }

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/30 backdrop-blur-md border-b border-blue-500/20">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        <h1 className="text-3xl font-extrabold text-blue-400 tracking-wider">
          ONe
        </h1>

        <div className="flex items-center gap-3">

          {user ? (
            <>
              <span className="text-white font-semibold">
                {user.inGameName}
              </span>

              {(user.role === "OWNER" ||
                user.role === "R5" ||
                user.role === "R4") && (
                <Button href="/admin">
                  Admin Dashboard
                </Button>
              )}

              <button
                onClick={logout}
                className="rounded-lg bg-red-600 hover:bg-red-700 px-4 py-2 text-white transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Button href="/login">
                Enter Portal
              </Button>

              <Button href="/register" variant="secondary">
                Request Access
              </Button>
            </>
          )}

        </div>
      </div>
    </nav>
  );
}