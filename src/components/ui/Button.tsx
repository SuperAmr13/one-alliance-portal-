type ButtonProps = {
      children: React.ReactNode;
        variant?: "primary" | "secondary";
          onClick?: () => void;
          };

          export default function Button({
            children,
              variant = "primary",
                onClick,
                }: ButtonProps) {
                  const base =
                      "rounded-xl px-6 py-3 font-semibold transition-all duration-200";

                        const styles = {
                            primary:
                                  "bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-600/20",
                                      secondary:
                                            "border border-blue-500 text-blue-400 hover:bg-blue-500/10",
                                              };

                                                return (
                                                    <button onClick={onClick} className={`${base} ${styles[variant]}`}>
                                                          {children}
                                                              </button>
                                                                );
                                                                }