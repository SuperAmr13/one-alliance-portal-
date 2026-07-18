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
        className="rounded-2xl border border-blue-500/60 bg-[#0f172a] px-5 py-3 text-white shadow-lg shadow-black/30 transition duration-200 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
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
        className="rounded-2xl border border-blue-500/60 bg-[#0f172a] px-5 py-3 text-white shadow-lg shadow-black/30 transition duration-200 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
      >
        <option value="name">Sort by Name</option>
        <option value="role">Sort by Role</option>
        <option value="newest">Newest First</option>
        <option value="oldest">Oldest First</option>
      </select>
    </div>
  );
}