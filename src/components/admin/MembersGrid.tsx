import MemberCard from "./MemberCard";

type Member = {
    id: string;
    playerId: string;
    inGameName: string;
    role: string;
};

type Props = {
    members: Member[];
    onEdit: (member: Member) => void;
    onDelete: (member: Member) => void;
};

export default function MembersGrid({
    members,
    onEdit,
    onDelete,
}: Props) {
    return (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {members.map((member) => (
                <MemberCard
                    key={member.id}
                    member={member}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
}