import { ReactNode } from "react";

type AuthLayoutProps = {
  title: string;
    subtitle: string;
      children: ReactNode;
      };

      export default function AuthLayout({
        title,
          subtitle,
            children,
            }: AuthLayoutProps) {
              return (
                  <main className="min-h-screen bg-[#050816] flex items-center justify-center px-6">
                        <div className="w-full max-w-md rounded-2xl border border-blue-900 bg-[#0b1024] p-8 shadow-2xl">

                                <h1 className="mb-2 text-center text-4xl font-bold text-blue-400">
                                          {title}
                                                  </h1>

                                                          <p className="mb-8 text-center text-gray-400">
                                                                    {subtitle}
                                                                            </p>

                                                                                    {children}

                                                                                          </div>
                                                                                              </main>
                                                                                                );
                                                                                                }