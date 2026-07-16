"use client";

import { useState } from "react";

export default function LoginPage() {
  const [playerId, setPlayerId] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin() {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          playerId,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Login failed.");
        return;
      }

      localStorage.setItem("user", JSON.stringify(data.user));
window.location.href = "/"; 
    } catch {
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#050816] flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-[#0b1024] border border-blue-900 rounded-2xl p-8 shadow-2xl">
        <h1 className="text-4xl text-center font-bold text-blue-400 mb-2">
          Enter Portal
        </h1>

        <p className="text-center text-gray-400 mb-8">
          Welcome back, warrior.
        </p>

        <input
          type="text"
          placeholder="Player ID"
          value={playerId}
          onChange={(e) => setPlayerId(e.target.value)}
          className="w-full mb-4 rounded-lg bg-[#111827] border border-blue-800 px-4 py-3 text-white outline-none"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 rounded-lg bg-[#111827] border border-blue-800 px-4 py-3 text-white outline-none"
        />

        {error && (
          <p className="mb-4 text-center text-red-400">
            {error}
          </p>
        )}

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full rounded-lg bg-blue-600 hover:bg-blue-700 py-3 text-white font-semibold transition disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>
    </main>
  );
}