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

  const [editingId, setEditingId] = useState("");
  const [editingName, setEditingName] = useState("");

  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchMembers();
  }, []);

  async function fetchMembers() {
    setLoading(true);

    try {
      const res = await fetch("/api/admin/members");
      const data = await res.json();
      setMembers(data);
    } finally {
      setLoading(false);
    }
  }

  async function deleteMember(id: string) {
    if (!confirm("Delete this member?")) return;

    setSaving(true);

    const res = await fetch("/api/admin/delete-member", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    const data = await res.json();

    if (!res.ok) {
      setMessage(data.error);
      setSaving(false);
      return;
    }

    setMessage("Member deleted.");

    await fetchMembers();

    setSaving(false);
  }

  async function changeRole(id: string, role: string) {
    setSaving(true);

    const res = await fetch("/api/admin/change-role", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        role,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      setMessage(data.error);
      setSaving(false);
      return;
    }

    setMessage("Role updated.");

    await fetchMembers();

    setSaving(false);
  }

  async function saveName() {
    if (!editingId) return;

    setSaving(true);

    const res = await fetch("/api/admin/edit-member", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: editingId,
        inGameName: editingName,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      setMessage(data.error);
      setSaving(false);
      return;
    }

    setEditingId("");
    setEditingName("");

    setMessage("Name updated.");

    await fetchMembers();

    setSaving(false);
  }

  const filteredMembers = useMemo(() => {
    return members.filter((member) => {
      const searchMatch =
        member.inGameName
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        member.playerId.includes(search);

      const roleMatch =
        roleFilter === "ALL" ||
        member.role === roleFilter;

      return searchMatch && roleMatch;
    });
  }, [members, search, roleFilter]);

  return (
    <AdminGuard>
      <main className="min-h-screen bg-[#050816] text-white p-6">

        <div className="mb-8">

          <h1 className="text-4xl font-bold text-blue-400">
            Members
          </h1>

          <p className="mt-2 text-gray-400">
            {filteredMembers.length} / {members.length} Members
          </p>

        </div>

        <div className="grid gap-4 md:grid-cols-2 mb-8">

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
            className="rounded-xl bg-[#0b1024] border border-blue-700 px-4 py-3"
          />

          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="rounded-xl bg-[#0b1024] border border-blue-700 px-4 py-3"
          >
            <option value="ALL">All Roles</option>
            <option value="OWNER">OWNER</option>
            <option value="R5">R5</option>
            <option value="R4">R4</option>
            <option value="MEMBER">MEMBER</option>
          </select>

        </div>
        {message && (
          <div className="mb-6 rounded-xl border border-green-700 bg-green-900/20 p-4 text-green-300">
            {message}
          </div>
        )}

        {loading ? (
          <div className="py-20 text-center text-gray-400">
            Loading members...
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredMembers.map((member) => (
              <div
                key={member.id}
                className="rounded-2xl border border-blue-800 bg-[#0b1024] p-6 transition duration-300 hover:-translate-y-1 hover:border-blue-500 hover:shadow-xl"
              >
                <div className="flex items-center gap-4">

                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-2xl font-bold">
                    {member.inGame
                )}
                  </main>
                </AdminGuard>
                );
                            }