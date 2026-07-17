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
        const res = await fetch("/api/me", {
          credentials: "include",
          cache: "no-store",
        });

        console.log("Status:", res.status);

        if (!res.ok) {
          console.log("Not authenticated");
          window.location.href = "/login";
          return;
        }

        const data = await res.json();

        console.log("API Response:", data);

        if (
          data.user?.role === "OWNER" ||
          data.user?.role === "R5" ||
          data.user?.role === "R4"
        ) {
          console.log("✅ Access granted");
          setAllowed(true);
        } else {
          console.log("❌ Access denied");
          window.location.href = "/";
        }
      } catch (err) {
        console.error("AdminGuard Error:", err);
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

  if (!allowed) {
    return null;
  }

  return <>{children}</>;
}