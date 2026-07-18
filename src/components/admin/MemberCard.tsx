type Member = {
  id: string;
  playerId: string;
  inGameName: string;
  role: "MEMBER" | "R4" | "R5" | "OWNER";
  approved: boolean;
  createdAt: string;
};

type Props = {
  member: Member;
  onEdit: (member: Member) => void;
  onRole: (member: Member) => void;
  onDelete: (member: Member) => void;
};

function roleColor(role: Member["role"]) {
  switch (role) {
    case "OWNER":
      return "bg-red-500/20 text-red-400 border-red-500/30";
    case "R5":
      return "bg-purple-500/20 text-purple-400 border-purple-500/30";
    case "R4":
      return "bg-blue-500/20 text-blue-400 border-blue-500/30";
    default:
      return "bg-green-500/20 text-green-400 border-green-500/30";
  }
}

export default function MemberCard({
  member,
  onEdit,
  onRole,
  onDelete,
}: Props) {
  return (
    <div className="rounded-2xl border border-blue-900/40 bg-[#0f172a] p-6 shadow-lg transition-all duration-200 hover:border-blue-500 hover:shadow-blue-900/20">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-xl font-bold text-blue-400">
            {member.inGameName}
          </h2>

          <p className="mt-2 text-sm text-zinc-400">
            Player ID
          </p>

          <p className="font-mono text-white">
            {member.playerId}
          </p>
        </div>

        <span
          className={`rounded-full border px-3 py-1 text-xs font-bold ${roleColor(
            member.role
          )}`}
        >
          {member.role}
        </span>
      </div>

      <div className="mt-6 border-t border-blue-900/30 pt-5">
        <p className="text-xs uppercase tracking-wider text-zinc-500">
          Current Role
        </p>

        <p className="mt-1 font-semibold text-white">
          {member.role}
        </p>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-3">
        <button
          onClick={() => onEdit(member)}
          className="rounded-xl bg-blue-600 px-4 py-2 font-semibold text-white transition hover:bg-blue-500"
        >
          Edit
        </button>

        <button
          onClick={() => onRole(member)}
          className="rounded-xl bg-amber-500 px-4 py-2 font-semibold text-black transition hover:bg-amber-400"
        >
          Role
        </button>

        <button
          onClick={() => onDelete(member)}
          className="rounded-xl bg-red-600 px-4 py-2 font-semibold text-white transition hover:bg-red-500"
        >
          Delete
        </button>
      </div>
    </div>
  );
}