type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function MembersSearch({
  value,
  onChange,
}: Props) {
  return (
    <div className="mb-6">
      <input
        type="text"
        placeholder="Search by in-game name or Player ID..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-blue-900/40 bg-[#0f172a] px-4 py-3 text-white placeholder:text-zinc-500 focus:border-blue-500 focus:outline-none"
      />
    </div>
  );
}