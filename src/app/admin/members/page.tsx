"use client";

import { useEffect, useMemo, useState } from "react";

import MembersStats from "@/components/admin/MembersStats";
import MembersHeader from "@/components/admin/MembersHeader";
import MembersSearch from "@/components/admin/MembersSearch";
import MembersFilters from "@/components/admin/MembersFilters";
import MembersGrid from "@/components/admin/MembersGrid";
import EmptyState from "@/components/admin/EmptyState";
import EditMemberModal from "@/components/admin/EditMemberModal";
import ResetPasswordModal from "@/components/admin/ResetPasswordModal";
import DeleteMemberModal from "@/components/admin/DeleteMemberModal";
import RoleModal from "@/components/admin/RoleModal";

type Member = {
id: string;
playerId: string;
inGameName: string;
role: "MEMBER" | "R4" | "R5" | "OWNER";
approved: boolean;
createdAt: string;
};

export default function MembersPage() {
const [members, setMembers] = useState<Member[]>([]);
const [loading, setLoading] = useState(true);
const [saving, setSaving] = useState(false);

const [search, setSearch] = useState("");
const [roleFilter, setRoleFilter] = useState("ALL");
const [sort, setSort] = useState("name");

const [selectedMember, setSelectedMember] = useState<Member | null>(null);
const [selectedRole, setSelectedRole] = useState("MEMBER");

const [editOpen, setEditOpen] = useState(false);
const [roleOpen, setRoleOpen] = useState(false);
const [resetOpen, setResetOpen] = useState(false);
const [deleteOpen, setDeleteOpen] = useState(false);

const [newPassword, setNewPassword] = useState<string | null>(null);
const [copied, setCopied] = useState(false);

async function loadMembers() {
setLoading(true);

try {
  const res = await fetch("/api/admin/members");

  if (!res.ok) {
    throw new Error("Failed to load members");
  }

  const data: Member[] = await res.json();
  setMembers(data);
} catch (error) {
  console.error(error);
} finally {
  setLoading(false);
}

}

useEffect(() => {
loadMembers();
}, []);

const filteredMembers = useMemo(() => {
const filtered = members.filter((member) => {
const matchesSearch =
member.inGameName.toLowerCase().includes(search.toLowerCase()) ||
member.playerId.includes(search);

  const matchesRole =
    roleFilter === "ALL" || member.role === roleFilter;

  return matchesSearch && matchesRole;
});

return [...filtered].sort((a, b) => {
  if (sort === "name") {
    return a.inGameName.localeCompare(b.inGameName);
  }

  if (sort === "name-desc") {
    return b.inGameName.localeCompare(a.inGameName);
  }

  if (sort === "role") {
    return a.role.localeCompare(b.role);
  }

  return 0;
});

}, [members, search, roleFilter, sort]);

const owners = members.filter((m) => m.role === "OWNER").length;
const r5 = members.filter((m) => m.role === "R5").length;
const r4 = members.filter((m) => m.role === "R4").length;
const normalMembers = members.filter((m) => m.role === "MEMBER").length;

async function handleEdit(name: string) {
if (!selectedMember) return;

setSaving(true);

try {
  const res = await fetch("/api/admin/edit-member", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: selectedMember.id,
      inGameName: name,
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to edit member");
  }

  setEditOpen(false);
  await loadMembers();
} catch (error) {
  console.error(error);
} finally {
  setSaving(false);
}

}

async function handleRole() {
if (!selectedMember) return;

setSaving(true);

try {
  const res = await fetch("/api/admin/role", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: selectedMember.id,
      role: selectedRole,
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to update role");
  }

  setRoleOpen(false);
  await loadMembers();
} catch (error) {
  console.error(error);
} finally {
  setSaving(false);
}

}

async function handleResetPassword() {
if (!selectedMember) return;

setSaving(true);

try {
  const res = await fetch("/api/admin/reset-password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: selectedMember.id,
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to reset password");
  }

  const data = await res.json();

  setResetOpen(false);
  setCopied(false);
  setNewPassword(data.password);
} catch (error) {
  console.error(error);
} finally {
  setSaving(false);
}

}

async function handleCopyPassword() {
if (!newPassword) return;

try {
  await navigator.clipboard.writeText(newPassword);
  setCopied(true);

  setTimeout(() => {
    setCopied(false);
  }, 2000);
} catch (error) {
  console.error("Failed to copy password:", error);
}

}

async function handleDelete() {
if (!selectedMember) return;

setSaving(true);

try {
  const res = await fetch("/api/admin/delete-member", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: selectedMember.id,
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to delete member");
  }

  setDeleteOpen(false);
  await loadMembers();
} catch (error) {
  console.error(error);
} finally {
  setSaving(false);
}

}

return (
<main className="min-h-screen bg-[#050816] p-8 text-white">
<div className="space-y-6">
<MembersHeader total={members.length} />

    <MembersStats
      total={members.length}
      owner={owners}
      r5={r5}
      r4={r4}
      member={normalMembers}
    />

    <MembersSearch
      value={search}
      onChange={setSearch}
    />

    <MembersFilters
      role={roleFilter}
      sort={sort}
      onRoleChange={setRoleFilter}
      onSortChange={setSort}
    />

    {loading ? (
      <div className="py-16 text-center text-zinc-400">
        Loading...
      </div>
    ) : filteredMembers.length === 0 ? (
      <EmptyState />
    ) : (
      <MembersGrid
        members={filteredMembers}
        onEdit={(member) => {
          setSelectedMember(member);
          setEditOpen(true);
        }}
        onRole={(member) => {
          setSelectedMember(member);
          setSelectedRole(member.role);
          setRoleOpen(true);
        }}
        onReset={(member) => {
          setSelectedMember(member);
          setResetOpen(true);
        }}
        onDelete={(member) => {
          setSelectedMember(member);
          setDeleteOpen(true);
        }}
      />
    )}

    <EditMemberModal
      member={selectedMember}
      open={editOpen}
      loading={saving}
      onClose={() => setEditOpen(false)}
      onSave={handleEdit}
    />

    <RoleModal
      member={selectedMember}
      open={roleOpen}
      selectedRole={selectedRole}
      loading={saving}
      onRoleChange={setSelectedRole}
      onClose={() => setRoleOpen(false)}
      onSave={handleRole}
    />

    <ResetPasswordModal
      member={selectedMember}
      open={resetOpen}
      loading={saving}
      onClose={() => setResetOpen(false)}
      onReset={handleResetPassword}
    />

    <DeleteMemberModal
      member={selectedMember}
      open={deleteOpen}
      loading={saving}
      onClose={() => setDeleteOpen(false)}
      onConfirm={handleDelete}
    />

    {newPassword && (
      <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-4">
        <div className="w-full max-w-md rounded-2xl border border-green-500/40 bg-[#0f172a] p-6 shadow-2xl">
          <h2 className="text-2xl font-bold text-white">
            Password Reset Successfully
          </h2>

          <p className="mt-3 text-zinc-300">
            The temporary password for{" "}
            <span className="font-semibold text-blue-400">
              {selectedMember?.inGameName}
            </span>{" "}
            is:
          </p>

          <div className="mt-5 rounded-xl border border-green-500/30 bg-[#050816] p-4">
            <p className="break-all text-center font-mono text-xl font-bold tracking-wider text-green-400">
              {newPassword}
            </p>
          </div>

          <button
            onClick={handleCopyPassword}
            className="mt-4 w-full rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-500"
          >
            {copied ? "✓ Copied!" : "📋 Copy Password"}
          </button>

          <p className="mt-3 text-center text-sm text-red-400">
            Make sure to copy the password before closing this window.
          </p>

          <button
            onClick={() => {
              setNewPassword(null);
              setCopied(false);
              setSelectedMember(null);
            }}
            className="mt-5 w-full rounded-xl bg-zinc-700 px-4 py-3 font-semibold text-white transition hover:bg-zinc-600"
          >
            Close
          </button>
        </div>
      </div>
    )}
  </div>
</main>

);
}