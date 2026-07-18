type Props = {
  role: string;
  sort: string;
  onRoleChange: (value: string) => void;
  onSortChange: (value: string) => void;
};

export default function MembersFilters({
  role,
  sort,
  onRoleChange,
  onSortChange,
}: Props) {
  return (
    <div className="mb-6 grid gap-4 md:grid-cols-2">
      <select
        value={role}
        onChange={(e) => onRoleChange(e.target.value)}
        className="rounded-xl border border-blue-900/40 bg-[#0f172a] px-4 py-3 text-white focus:border-blue-500 focus:outline-none"
      >
        <option value="ALL">All Roles</option>
        <option value="OWNER">OWNER</option>
        <option value="R5">R5</option>
        <option value="R4">R4</option>
        <option value="MEMBER">MEMBER</option>
      </select>

      <select
        value={sort}
        onChange={(e) => onSortChange(e.target.value)}
        className="rounded-xl border border-blue-900/40 bg-[#0f172a] px-4 py-3 text-white focus:border-blue-500 focus:outline-none"
      >
        <option value="name">Sort by Name</option>
        <option value="role">Sort by Role</option>
        <option value="newest">Newest First</option>
        <option value="oldest">Oldest First</option>
      </select>
    </div>
  );
}