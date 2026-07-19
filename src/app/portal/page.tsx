import Link from "next/link";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function PortalPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <main className="min-h-screen bg-[#050816] p-8 text-white">
      <h1 className="text-4xl font-bold text-blue-400">
        Welcome, {user.inGameName}
      </h1>

      <p className="mt-2 text-gray-400">
        Player ID: {user.playerId}
      </p>

      <p className="mt-1 text-gray-400">
        Role: {user.role}
      </p>

      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">

        <div className="rounded-xl border border-blue-800 bg-[#0b1024] p-6">
          <h2 className="mb-2 text-xl font-bold">
            My Profile
          </h2>

          <p className="text-gray-400">
            View your account information.
          </p>
        </div>

        <Link
          href="/portal/report"
          className="rounded-xl border border-blue-800 bg-[#0b1024] p-6 transition hover:border-blue-500 hover:bg-[#101938]"
        >
          <h2 className="mb-2 text-xl font-bold">
            Weekly Reports
          </h2>

          <p className="text-gray-400">
            Submit your weekly reports.
          </p>
        </Link>

        <div className="rounded-xl border border-blue-800 bg-[#0b1024] p-6">
          <h2 className="mb-2 text-xl font-bold">
            Statistics
          </h2>

          <p className="text-gray-400">
            View your alliance statistics.
          </p>
        </div>

      </div>
    </main>
  );
}