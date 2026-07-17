type Props = {
  total: number;
  owners: number;
  r5: number;
  r4: number;
  members: number;
};

function Card({
  title,
  value,
}: {
  title: string;
  value: number;
}) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
      <p className="text-sm text-zinc-400">{title}</p>

      <h2 className="mt-2 text-3xl font-bold text-white">
        {value}
      </h2>
    </div>
  );
}

export default function StatsCards({
  total,
  owners,
  r5,
  r4,
  members,
}: Props) {
  return (
    <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
      <Card title="Total Members" value={total} />
      <Card title="Owners" value={owners} />
      <Card title="R5" value={r5} />
      <Card title="R4" value={r4} />
      <Card title="Members" value={members} />
    </div>
  );
}