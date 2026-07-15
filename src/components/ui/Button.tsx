import Link from "next/link";

type ButtonProps = {
  children: React.ReactNode;
    href?: string;
      variant?: "primary" | "secondary";
        onClick?: () => void;
          type?: "button" | "submit";
          };

          export default function Button({
            children,
              href,
                variant = "primary",
                  onClick,
                    type = "button",
                    }: ButtonProps) {
                      const classes =
                          variant === "primary"
                                ? "rounded-xl bg-blue-600 hover:bg-blue-700 px-6 py-3 text-white font-semibold transition duration-200"
                                      : "rounded-xl border border-blue-700 bg-transparent hover:bg-blue-900/20 px-6 py-3 text-blue-300 font-semibold transition duration-200";

                                        if (href) {
                                            return (
                                                  <Link href={href} className={classes}>
                                                          {children}
                                                                </Link>
                                                                    );
                                                                      }

                                                                        return (
                                                                            <button type={type} onClick={onClick} className={classes}>
                                                                                  {children}
                                                                                      </button>
                                                                                        );
                                                                                        }