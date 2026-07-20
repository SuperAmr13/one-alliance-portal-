"use client";

import { useState } from "react";

export default function RegisterPage() {
  const [playerId, setPlayerId] = useState("");
  const [ingameName, setIngameName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleRegister() {
    if (password !== confirmPassword) {
      setSuccess(false);
      setMessage("Passwords do not match.");
      return;
    }

    const res = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        playerId,
        ingameName,
        password,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      setSuccess(true);
      setMessage(
        "✅ Your request has been submitted successfully. Please wait for approval."
      );

      setPlayerId("");
      setIngameName("");
      setPassword("");
      setConfirmPassword("");

      // العودة للصفحة الرئيسية بعد ثانيتين
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    } else {
      setSuccess(false);
      setMessage(data.error || "Something went wrong.");
    }
  }

  return (
    <main className="min-h-screen bg-[#050816] flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-[#0b1024] border border-blue-900 rounded-2xl p-8 shadow-2xl">
        <h1 className="text-4xl text-center font-bold text-blue-400 mb-2">
          Request Access
        </h1>

        <p className="text-center text-gray-400 mb-8">
          Join the ONe Nation Elite.
        </p>

        <input
          type="text"
          placeholder="Player ID"
          value={playerId}
          onChange={(e) => setPlayerId(e.target.value)}
          className="w-full mb-4 rounded-lg bg-[#111827] border border-blue-800 px-4 py-3 text-white outline-none"
        />

        <input
          type="text"
          placeholder="In-Game Name"
          value={ingameName}
          onChange={(e) => setIngameName(e.target.value)}
          className="w-full mb-4 rounded-lg bg-[#111827] border border-blue-800 px-4 py-3 text-white outline-none"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 rounded-lg bg-[#111827] border border-blue-800 px-4 py-3 text-white outline-none"
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full mb-6 rounded-lg bg-[#111827] border border-blue-800 px-4 py-3 text-white outline-none"
        />

        <button
          onClick={handleRegister}
          className="w-full rounded-lg bg-blue-600 hover:bg-blue-700 py-3 text-white font-semibold transition"
        >
          Request Access
        </button>

        {message && (
          <p
            className={`mt-6 text-center ${
              success ? "text-green-400" : "text-red-400"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </main>
  );
}