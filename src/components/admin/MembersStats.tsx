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
    <div className="mb-6 rounded-2xl border border-blue-900/40 bg-[#0f172a] p-4">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
        {items.map((item) => (
          <div key={item.label} className="text-center">
            <p className="text-xs uppercase tracking-wider text-zinc-500">
              {item.label}
            </p>

            <p className="mt-1 text-2xl font-bold text-blue-400">
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}