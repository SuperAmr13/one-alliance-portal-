"use client";

import { useEffect, useState } from "react";

type User = {
  role: string;
};

export default function AdminGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      window.location.href = "/";
      return;
    }

    const user: User = JSON.parse(storedUser);

    if (
      user.role === "OWNER" ||
      user.role === "R5" ||
      user.role === "R4"
    ) {
      setAllowed(true);
    } else {
      window.location.href = "/";
    }
  }, []);

  if (!allowed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050816] text-white">
        Checking permissions...
      </div>
    );
  }

  return <>{children}</>;
}