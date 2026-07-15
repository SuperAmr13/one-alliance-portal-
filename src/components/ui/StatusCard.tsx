type StatusCardProps = {
      type: "success" | "error" | "info";
        title: string;
          message: string;
          };

          export default function StatusCard({
            type,
              title,
                message,
                }: StatusCardProps) {
                  const colors = {
                      success: "border-green-500 bg-green-500/10 text-green-300",
                          error: "border-red-500 bg-red-500/10 text-red-300",
                              info: "border-blue-500 bg-blue-500/10 text-blue-300",
                                };

                                  return (
                                      <div
                                            className={`mt-6 rounded-xl border p-4 text-center ${colors[type]}`}
                                                >
                                                      <h3 className="font-bold text-lg">{title}</h3>

                                                            <p className="mt-2 text-sm">
                                                                    {message}
                                                                          </p>
                                                                              </div>
                                                                                );
                                                                                }