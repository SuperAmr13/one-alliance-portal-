import Link from "next/link";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function PortalPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <main className="min-h-screen bg-[#050816] text-white px-5 py-8">
      <h1 className="text-3xl font-bold text-blue-400">
        Welcome, {user.inGameName}
      </h1>

      <p className="mt-2 text-gray-400">
        Player ID: {user.playerId}
      </p>

      <p className="mt-1 text-gray-400">
        Role: {user.role}
      </p>

      <div className="grid grid-cols-1 gap-5 mt-10">

        <Link
          href="/portal/report"
          className="block rounded-xl border border-blue-800 bg-[#0b1024] p-6 transition-all duration-200 hover:border-blue-500 hover:bg-[#101735] active:scale-[0.98]"
        >
          <h2 className="text-xl font-bold mb-2">
            📝 Weekly Report
          </h2>

          <p className="text-gray-400">
            Submit your weekly report.
          </p>
        </Link>

        <Link
          href="/portal/profile"
          className="block rounded-xl border border-blue-800 bg-[#0b1024] p-6 transition-all duration-200 hover:border-blue-500 hover:bg-[#101735] active:scale-[0.98]"
        >
          <h2 className="text-xl font-bold mb-2">
            👤 My Profile
          </h2>

          <p className="text-gray-400">
            View your account information.
          </p>
        </Link>

        <Link
          href="/portal/statistics"
          className="block rounded-xl border border-blue-800 bg-[#0b1024] p-6 transition-all duration-200 hover:border-blue-500 hover:bg-[#101735] active:scale-[0.98]"
        >
          <h2 className="text-xl font-bold mb-2">
            📊 Statistics
          </h2>

          <p className="text-gray-400">
            Coming Soon.
          </p>
        </Link>

        <Link
          href="/portal/news"
          className="block rounded-xl border border-blue-800 bg-[#0b1024] p-6 transition-all duration-200 hover:border-blue-500 hover:bg-[#101735] active:scale-[0.98]"
        >
          <h2 className="text-xl font-bold mb-2">
            📢 Alliance News
          </h2>

          <p className="text-gray-400">
            Coming Soon.
          </p>
        </Link>

      </div>
    </main>
  );
}