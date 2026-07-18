type Props = {
  total: number;
  owner: number;
  r5: number;
  r4: number;
  member: number;
};

export default function MembersStats({
  total,
  owner,
  r5,
  r4,
  member,
}: Props) {
  const items = [
    { label: "Total", value: total },
    { label: "OWNER", value: owner },
    { label: "R5", value: r5 },
    { label: "R4", value: r4 },
    { label: "MEMBER", value: member },
  ];

  return (
    <div className="mb-6 rounded-2xl border border-blue-500/60 bg-[#0f172a] p-5 shadow-lg shadow-black/30">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
        {items.map((item) => (
          <div
            key={item.label}
            className="rounded-xl border border-blue-500/10 p-4 text-center transition duration-200 hover:border-blue-500/40 hover:bg-blue-500/5"
          >
            <p className="text-xs uppercase tracking-wider text-zinc-500">
              {item.label}
            </p>

            <p className="mt-2 text-3xl font-bold text-blue-400">
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}