"use client";

import { useEffect, useState } from "react";

type User = {
  id: string;
  playerId: string;
  inGameName: string;
  role: string;
};

export default function AdminGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    async function checkUser() {
      try {
        const res = await fetch("/api/me");

        if (!res.ok) {
          window.location.href = "/login";
          return;
        }

        const data = await res.json();

        if (
          data.user.role === "OWNER" ||
          data.user.role === "R5" ||
          data.user.role === "R4"
        ) {
          setAllowed(true);
        } else {
          window.location.href = "/";
        }
      } catch {
        window.location.href = "/login";
      } finally {
        setLoading(false);
      }
    }

    checkUser();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050816] text-white">
        Checking permissions...
      </div>
    );
  }

  if (!allowed) return null;

  return <>{children}</>;
}