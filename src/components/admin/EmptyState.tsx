type Props = {
      message?: string;
      };

      export default function EmptyState({
        message = "No members found.",
        }: Props) {
          return (
              <div className="rounded-xl border border-dashed border-zinc-700 p-10 text-center">
                    <h2 className="text-lg font-semibold text-white">
                            {message}
                                  </h2>

                                        <p className="mt-2 text-zinc-400">
                                                Try changing the search or filter.
                                                      </p>
                                                          </div>
                                                            );
                                                            }
