type Member = {
  id: string;
  playerId: string;
  inGameName: string;
  role: string;
};

type Props = {
  member: Member;
  onEdit: (member: Member) => void;
  onDelete: (member: Member) => void;
};

function roleColor(role: string) {
  switch (role) {
    case "OWNER":
      return "bg-red-600";

    case "R5":
      return "bg-purple-600";

    case "R4":
      return "bg-blue-600";

    default:
      return "bg-green-600";
  }
}

export default function MemberCard({
  member,
  onEdit,
  onDelete,
}: Props) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-white">
            {member.inGameName}
          </h2>

          <p className="text-sm text-zinc-400">
            {member.playerId}
          </p>
        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-bold text-white ${roleColor(
            member.role
          )}`}
        >
          {member.role}
        </span>
      </div>

      <div className="mt-5 flex gap-2">
        <button
          onClick={() => onEdit(member)}
          className="flex-1 rounded-lg bg-blue-600 py-2 font-semibold hover:bg-blue-700"
        >
          Edit
        </button>

        <button
          onClick={() => onDelete(member)}
          className="flex-1 rounded-lg bg-red-600 py-2 font-semibold hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  );
}