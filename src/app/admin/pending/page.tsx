"use client";

import { useEffect, useState } from "react";

type PendingUser = {
  id: string;
  playerId: string;
  inGameName: string;
  role: string;
  createdAt: string;
};

export default function PendingPage() {
  const [users, setUsers] = useState<PendingUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPending();
  }, []);

  async function fetchPending() {
    try {
      const res = await fetch("/api/admin/pending");
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function approveUser(id: string) {
    try {
      const res = await fetch("/api/admin/approve", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (!res.ok) {
        alert("Failed to approve user.");
        return;
      }

      setUsers((prev) => prev.filter((user) => user.id !== id));
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    }
  }

  async function rejectUser(id: string) {
    try {
      const res = await fetch("/api/admin/reject", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (!res.ok) {
        alert("Failed to reject user.");
        return;
      }

      setUsers((prev) => prev.filter((user) => user.id !== id));
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    }
  }

  return (
    <main className="min-h-screen bg-[#050816] text-white p-8">
      <h1 className="text-4xl font-bold text-blue-400 mb-8">
        Pending Requests
      </h1>

      {loading && <p className="text-gray-400">Loading...</p>}

      {!loading && users.length === 0 && (
        <p className="text-gray-400">No pending requests.</p>
      )}

      <div className="grid gap-6">
        {users.map((user) => (
          <div
            key={user.id}
            className="rounded-xl border border-blue-800 bg-[#0b1024] p-6"
          >
            <h2 className="text-2xl font-bold text-blue-400">
              {user.inGameName}
            </h2>

            <p className="mt-2">
              <strong>Player ID:</strong> {user.playerId}
            </p>

            <p>
              <strong>Requested Role:</strong> {user.role}
            </p>

            <p>
              <strong>Registered:</strong>{" "}
              {new Date(user.createdAt).toLocaleString()}
            </p>

            <div className="mt-6 flex gap-4">
              <button
                onClick={() => approveUser(user.id)}
                className="flex-1 rounded-lg bg-green-600 hover:bg-green-700 py-2 transition"
              >
                Approve
              </button>

              <button
                onClick={() => rejectUser(user.id)}
                className="flex-1 rounded-lg bg-red-600 hover:bg-red-700 py-2 transition"
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}