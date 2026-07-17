type Props = {
    value: string;
    onChange: (value: string) => void;
};

export default function MembersFilters({
    value,
    onChange,
}: Props) {
    return (
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="mb-6 w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-white outline-none md:w-64"
        >
            <option value="ALL">All Roles</option>
            <option value="OWNER">OWNER</option>
            <option value="R5">R5</option>
            <option value="R4">R4</option>
            <option value="MEMBER">MEMBER</option>
        </select>
    );
}
