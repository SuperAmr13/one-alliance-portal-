"use client";

import { useState } from "react";

type Props = {
  user: {
    inGameName: string;
    playerId: string;
    role: string;
  };
};

export default function ProfileForm({ user }: Props) {
  const [name, setName] = useState(user.inGameName);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  async function saveProfile() {
    setLoading(true);
    setSuccess("");
    setError("");

    try {
      const res = await fetch("/api/profile/update", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inGameName: name,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to update profile.");
        return;
      }

      setSuccess("Profile updated successfully.");
    } catch {
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-8 rounded-2xl border border-blue-800 bg-[#0b1024] p-6">
      <h2 className="text-xl font-bold">Edit Profile</h2>

      <label className="mt-6 block text-sm text-gray-400">
        In-Game Name
      </label>

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="mt-2 w-full rounded-lg border border-blue-700 bg-[#050816] p-3 text-white outline-none focus:border-blue-500"
      />

      <button
        onClick={saveProfile}
        disabled={loading}
        className="mt-6 rounded-lg bg-blue-600 px-5 py-3 font-semibold transition hover:bg-blue-500 disabled:opacity-50"
      >
        {loading ? "Saving..." : "Save Changes"}
      </button>

      {success && (
        <p className="mt-4 text-green-400">{success}</p>
      )}

      {error && (
        <p className="mt-4 text-red-400">{error}</p>
      )}
    </div>
  );
}