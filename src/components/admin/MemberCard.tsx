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
  onDelete: (member: Member) => void;
  onRole: (member: Member) => void;
};

function roleStyle(role: Member["role"]) {
  switch (role) {
    case "OWNER":
      return "bg-red-600/20 text-red-400 border-red-500/30";
    case "R5":
      return "bg-purple-600/20 text-purple-400 border-purple-500/30";
    case "R4":
      return "bg-blue-600/20 text-blue-400 border-blue-500/30";
    default:
      return "bg-green-600/20 text-green-400 border-green-500/30";
  }
}

export default function MemberCard({
  member,
  onEdit,
  onDelete,
  onRole,
}: Props) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5 transition hover:border-zinc-700">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-white">
            {member.inGameName}
          </h2>

          <p className="mt-1 text-sm text-zinc-500">
            Player ID: {member.playerId}
          </p>
        </div>

        <span
          className={`rounded-full border px-3 py-1 text-xs font-bold ${roleStyle(
            member.role
          )}`}
        >
          {member.role}
        </span>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-2">
        <button
          onClick={() => onEdit(member)}
          className="rounded-lg bg-blue-600 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          Edit
        </button>

        <button
          onClick={() => onRole(member)}
          className="rounded-lg bg-amber-500 py-2 text-sm font-semibold text-black transition hover:bg-amber-400"
        >
          Role
        </button>

        <button
          onClick={() => onDelete(member)}
          className="rounded-lg bg-red-600 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  );
}