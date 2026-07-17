"use client";

import { useEffect, useMemo, useState } from "react";
import AdminGuard from "@/components/AdminGuard";
import RoleBadge from "@/components/RoleBadge";

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
  const [roleFilter, setRoleFilter] = useState("ALL");
  const [sortBy, setSortBy] = useState("NAME");

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
    let result = members.filter((member) => {
      const matchesSearch =
        member.inGameName.toLowerCase().includes(search.toLowerCase()) ||
        member.playerId.includes(search);

      const matchesRole =
        roleFilter === "ALL" || member.role === roleFilter;

      return matchesSearch && matchesRole;
    });

    switch (sortBy) {
      case "NAME":
        result.sort((a, b) =>
          a.inGameName.localeCompare(b.inGameName)
        );
        break;

      case "ROLE":
        result.sort((a, b) =>
          a.role.localeCompare(b.role)
        );
        break;
    }

    return result;
  }, [members, search, roleFilter, sortBy]);

  return (
    <AdminGuard>
      <main className="min-h-screen bg-[#050816] text-white p-8">
        <h1 className="text-4xl font-bold text-blue-400 mb-2">
          Members
        </h1>

        <p className="text-gray-400 mb-6">
          Showing {filteredMembers.length} of {members.length} members
        </p>

        <input
          type="text"
          placeholder="Search by name or Player ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full mb-4 rounded-lg bg-[#0b1024] border border-blue-700 px-4 py-3 outline-none"
        />

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="rounded-lg bg-[#0b1024] border border-blue-700 px-4 py-3"
          >
            <option value="ALL">All Roles</option>
            <option value="OWNER">OWNER</option>
            <option value="R5">R5</option>
            <option value="R4">R4</option>
            <option value="MEMBER">MEMBER</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="rounded-lg bg-[#0b1024] border border-blue-700 px-4 py-3"
          >
            <option value="NAME">Sort by Name</option>
            <option value="ROLE">Sort by Role</option>
          </select>
        </div>

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

              <div className="mt-2 flex items-center gap-2">
                <strong>Role:</strong>
                <RoleBadge role={member.role} />
              </div>

              <p className="mt-2">
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