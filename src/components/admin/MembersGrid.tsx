import MemberCard from "./MemberCard";

type Member = {
  id: string;
  playerId: string;
  inGameName: string;
  role: "MEMBER" | "R4" | "R5" | "OWNER";
  approved: boolean;
  createdAt: string;
};

type Props = {
  members: Member[];
  onEdit: (member: Member) => void;
  onRole: (member: Member) => void;
  onDelete: (member: Member) => void;
};

export default function MembersGrid({
  members,
  onEdit,
  onRole,
  onDelete,
}: Props) {
  if (members.length === 0) {
    return (
      <div className="rounded-2xl border border-blue-900/40 bg-[#0f172a] p-10 text-center text-zinc-400">
        No members found.
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {members.map((member) => (
        <MemberCard
          key={member.id}
          member={member}
          onEdit={onEdit}
          onRole={onRole}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}