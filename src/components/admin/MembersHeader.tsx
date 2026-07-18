type Props = {
  total: number;
};

export default function MembersHeader({ total }: Props) {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold tracking-tight text-blue-400">
        Alliance Members
      </h1>

      <p className="mt-2 text-sm text-zinc-400">
        Manage members, edit information, assign roles, and control alliance
        access.
      </p>

      <div className="mt-4 inline-flex items-center rounded-full border border-blue-900/40 bg-[#0f172a] px-4 py-2">
        <span className="text-sm text-zinc-300">
          Showing{" "}
          <span className="font-bold text-blue-400">
            {total}
          </span>{" "}
          members
        </span>
      </div>
    </div>
  );
}