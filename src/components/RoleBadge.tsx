type Props = {
      role: string;
      };

      export default function RoleBadge({ role }: Props) {
        const styles: Record<string, string> = {
            OWNER: "bg-red-600 text-white",
                R5: "bg-purple-600 text-white",
                    R4: "bg-blue-600 text-white",
                        MEMBER: "bg-gray-600 text-white",
                          };

                            return (
                                <span
                                      className={`inline-block rounded-full px-3 py-1 text-sm font-semibold ${
                                              styles[role] ?? "bg-gray-700 text-white"
                                                    }`}
                                                        >
                                                              {role}
                                                                  </span>
                                                                    );
                                                                    }
