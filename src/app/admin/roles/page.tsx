"use client";

import { useEffect, useMemo, useState } from "react";
import AdminGuard from "@/components/AdminGuard";

type Member = {
  id: string;
  playerId: string;
  inGameName: string;
  role: string;
};

export default function RolesPage() {
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

  async function updateRole(id: string, role: string) {
    try {
      const res = await fetch("/api/admin/role", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, role }),
      });

      if (!res.ok) {
        alert("Failed to update role.");
        return;
      }

      alert("Role updated successfully.");
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    }
  }

  return (
    <AdminGuard>
      <main className="min-h-screen bg-[#050816] text-white p-8">
        <h1 className="text-4xl font-bold text-blue-400 mb-8">
          Roles Management
        </h1>

        <input
          type="text"
          placeholder="Search by name or Player ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full mb-8 rounded-lg bg-[#0b1024] border border-blue-700 px-4 py-3 outline-none"
        />

        {loading && <p>Loading...</p>}

        {!loading && filteredMembers.length === 0 && (
          <p className="text-gray-400">No members found.</p>
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

              <div className="mt-4 flex gap-4 items-center">
                <select
                  value={member.role}
                  onChange={(e) => {
                    const role = e.target.value;

                    setMembers((prev) =>
                      prev.map((m) =>
                        m.id === member.id ? { ...m, role } : m
                      )
                    );
                  }}
                  className="rounded-lg bg-[#050816] border border-blue-700 px-4 py-2"
                >
                  <option value="MEMBER">MEMBER</option>
                  <option value="R4">R4</option>
                  <option value="R5">R5</option>
                  <option value="OWNER">OWNER</option>
                </select>

                <button
                  onClick={() => updateRole(member.id, member.role)}
                  className="rounded-lg bg-blue-600 hover:bg-blue-700 px-5 py-2 transition"
                >
                  Save
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </AdminGuard>
  );
}