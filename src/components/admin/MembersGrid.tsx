import MemberCard from "./MemberCard";

type Member = {
    id: string;
      playerId: string;
        inGameName: string;
          role: "MEMBER" | "R4" | "R5" | "OWNER";
            approved: boolean;
              createdAt: string;
              };

type MembersGridProps = {
  members: Member[];
  onEdit: (member: Member) => void;
  onDelete: (member: Member) => void;
  onRole: (member: Member) => void;
};

export default function MembersGrid({
  members,
  onEdit,
  onDelete,
  onRole,
}: MembersGridProps) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {members.map((member) => (
        <MemberCard
          key={member.id}
          member={member}
          onEdit={onEdit}
          onDelete={onDelete}
          onRole={onRole}
        />
      ))}
    </div>
  );
}