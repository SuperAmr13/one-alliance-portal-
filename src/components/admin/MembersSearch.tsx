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
        placeholder="Search by In-Game Name or Player ID..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-2xl border border-blue-500/60 bg-[#0f172a] px-5 py-3 text-white shadow-lg shadow-black/30 transition duration-200 placeholder:text-zinc-500 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
      />
    </div>
  );
}