"use client";

import { useEffect, useMemo, useState } from "react";
import AdminGuard from "@/components/AdminGuard";

type Member = {
  id: string;
  playerId: string;
  inGameName: string;
  role: string;
  createdAt: string;
};

export default function MembersPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchMembers();
  }, []);

  async function fetchMembers() {
    try {
      const res = await fetch("/api/admin/members");
      const data = await res.json();
      setMembers(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const filteredMembers = useMemo(() => {
    return members.filter(
      (member) =>
        member.inGameName.toLowerCase().includes(search.toLowerCase()) ||
        member.playerId.includes(search)
    );
  }, [members, search]);

  return (
    <AdminGuard>
      <main className="min-h-screen bg-[#050816] text-white p-8">
        <h1 className="text-4xl font-bold text-blue-400 mb-8">
          Members
        </h1>

        <input
          type="text"
          placeholder="Search by name or Player ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full mb-8 rounded-lg bg-[#0b1024] border border-blue-700 px-4 py-3 outline-none"
        />

        {loading && (
          <p className="text-gray-400">Loading...</p>
        )}

        {!loading && filteredMembers.length === 0 && (
          <p className="text-gray-400">
            No members found.
          </p>
        )}

        <div className="grid gap-6">
          {filteredMembers.map((member) => (
            <div
              key={member.id}
              className="rounded-xl border border-blue-800 bg-[#0b1024] p-6"
            >
              <h2 className="text-2xl font-bold text-blue-400">
                {member.inGameName}
              </h2>

              <p className="mt-2">
                <strong>Player ID:</strong> {member.playerId}
              </p>

              <p>
                <strong>Role:</strong> {member.role}
              </p>

              <p>
                <strong>Joined:</strong>{" "}
                {new Date(member.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </main>
    </AdminGuard>
  );
}