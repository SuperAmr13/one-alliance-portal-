type MembersHeaderProps = {
      total: number;
      };

      export default function MembersHeader({
        total,
        }: MembersHeaderProps) {
          return (
              <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                            <h1 className="text-3xl font-bold text-white">
                                      Members
                                              </h1>

                                                      <p className="mt-2 text-zinc-400">
                                                                Manage alliance members and their information.
                                                                        </p>
                                                                              </div>

                                                                                    <div className="rounded-xl border border-zinc-800 bg-zinc-900 px-5 py-4">
                                                                                            <p className="text-sm text-zinc-400">
                                                                                                      Total Members
                                                                                                              </p>

                                                                                                                      <h2 className="mt-1 text-3xl font-bold text-white">
                                                                                                                                {total}
                                                                                                                                        </h2>
                                                                                                                                              </div>
                                                                                                                                                  </div>
                                                                                                                                                    );
                                                                                                                                                    }
