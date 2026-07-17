"use client";

import { useEffect, useMemo, useState } from "react";

import StatsCards from "@/components/admin/StatsCards";
import MembersHeader from "@/components/admin/MembersHeader";
import MembersSearch from "@/components/admin/MembersSearch";
import MembersFilters from "@/components/admin/MembersFilters";
import MembersGrid from "@/components/admin/MembersGrid";
import EmptyState from "@/components/admin/EmptyState";
import EditMemberModal from "@/components/admin/EditMemberModal";
import DeleteMemberModal from "@/components/admin/DeleteMemberModal";
import RoleModal from "@/components/admin/RoleModal";

type Member ={
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

  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [selectedRole, setSelectedRole] = useState("MEMBER");

  const [editOpen, setEditOpen] = useState(false);
  const [roleOpen, setRoleOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  async function loadMembers() {
    setLoading(true);

    try {
      const res = await fetch("/api/admin/members");

      if (!res.ok) {
        throw new Error("Failed to load members");
      }

      const data: Member[] = await res.json();
      setMembers(data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadMembers();
  }, []);

  const filteredMembers = useMemo(() => {
    return members.filter((member) => {
      const matchesSearch =
        member.inGameName.toLowerCase().includes(search.toLowerCase()) ||
        member.playerId.includes(search);

      const matchesRole =
        roleFilter === "ALL" || member.role === roleFilter;

      return matchesSearch && matchesRole;
    });
  }, [members, search, roleFilter]);

  const owners = members.filter((m) => m.role === "OWNER").length;
  const r5 = members.filter((m) => m.role === "R5").length;
  const r4 = members.filter((m) => m.role === "R4").length;
  const normalMembers = members.filter((m) => m.role === "MEMBER").length;
  async function handleEdit(name: string) {
    if (!selectedMember) return;

    setSaving(true);

    try {
      await fetch("/api/admin/edit-member", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: selectedMember.id,
          inGameName: name,
        }),
      });

      setEditOpen(false);
      await loadMembers();
    } finally {
      setSaving(false);
    }
  }

  async function handleRole() {
    if (!selectedMember) return;

    setSaving(true);

    try {
      await fetch("/api/admin/role", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: selectedMember.id,
          role: selectedRole,
        }),
      });

      setRoleOpen(false);
      await loadMembers();
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!selectedMember) return;

    setSaving(true);

    try {
      await fetch("/api/admin/delete-member", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: selectedMember.id,
        }),
      });

      setDeleteOpen(false);
      await loadMembers();
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      <MembersHeader total={members.length} />

      <StatsCards
        total={members.length}
        owners={owners}
        r5={r5}
        r4={r4}
        members={normalMembers}
      />

      <MembersSearch
        value={search}
        onChange={setSearch}
      />

      <MembersFilters
        value={roleFilter}
        onChange={setRoleFilter}
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

      <DeleteMemberModal
        member={selectedMember}
        open={deleteOpen}
        loading={saving}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
}