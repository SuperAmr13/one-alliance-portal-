import Link from "next/link";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";

import ForcePasswordChange from "@/components/profile/ForcePasswordChange";

export default async function PortalPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const currentCycle = await prisma.allianceCycle.findFirst({
    where: {
      isCurrent: true,
    },
  });

  const latestReport = await prisma.report.findFirst({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const currentReport = currentCycle
    ? await prisma.report.findUnique({
        where: {
          userId_cycleId: {
            userId: user.id,
            cycleId: currentCycle.id,
          },
        },
      })
    : null;

  const isAdmin =
    user.role === "OWNER" ||
    user.role === "R5" ||
    user.role === "R4";

  return (
    <main className="min-h-screen bg-[#050816] px-5 py-8 text-white">
      <ForcePasswordChange
        force={user.mustChangePassword}
        user={{
          inGameName: user.inGameName,
          playerId: user.playerId,
          role: user.role,
        }}
      />

      <h1 className="text-3xl font-bold text-blue-400">
        Welcome, {user.inGameName} 👋
      </h1>

      <p className="mt-2 text-gray-400">
        Player ID: {user.playerId}
      </p>

      <p className="text-gray-400">
        Role: {user.role}
      </p>

      <h2 className="mt-10 mb-5 text-2xl font-bold">
        📊 My Dashboard
      </h2>

      <div className="grid grid-cols-2 gap-4">

        <div className="rounded-xl border border-blue-800 bg-[#0b1024] p-4">
          <p className="text-sm text-gray-400">📅 Current Week</p>
          <p className="mt-2 text-xl font-bold">
            {currentCycle ? `Week ${currentCycle.weekNumber}` : "No Cycle"}
          </p>
        </div>

        <div className="rounded-xl border border-blue-800 bg-[#0b1024] p-4">
          <p className="text-sm text-gray-400">📝 Report Status</p>
          <p className="mt-2 text-xl font-bold">
            {currentReport ? "Submitted ✅" : "Not Submitted ❌"}
          </p>
        </div>

        <div className="rounded-xl border border-blue-800 bg-[#0b1024] p-4">
          <p className="text-sm text-gray-400">🔥 Hero Power</p>
          <p className="mt-2 text-xl font-bold">
            {latestReport
              ? Number(latestReport.heroPower).toLocaleString()
              : "---"}
          </p>
        </div>

        <div className="rounded-xl border border-blue-800 bg-[#0b1024] p-4">
          <p className="text-sm text-gray-400">⚔️ First Squad</p>
          <p className="mt-2 text-xl font-bold">
            {latestReport
              ? Number(latestReport.firstSquadPower).toLocaleString()
              : "---"}
          </p>
        </div>

      </div>

      <div className="mt-8 space-y-4">

        {isAdmin && (
          <Link
            href="/admin"
            className="block rounded-xl border border-yellow-600 bg-[#1b1620] p-6 transition hover:border-yellow-400"
          >
            <h2 className="text-xl font-bold">
              🛡️ Admin Dashboard
            </h2>

            <p className="mt-2 text-gray-400">
              Manage members, reports and alliance settings.
            </p>
          </Link>
        )}

        <Link
          href="/portal/report"
          className="block rounded-xl border border-blue-800 bg-[#0b1024] p-6 transition hover:border-blue-500"
        >
          <h2 className="text-xl font-bold">
            📝 Weekly Report
          </h2>

          <p className="mt-2 text-gray-400">
            Submit your weekly report.
          </p>
        </Link>

        <Link
          href="/portal/profile"
          className="block rounded-xl border border-blue-800 bg-[#0b1024] p-6 transition hover:border-blue-500"
        >
          <h2 className="text-xl font-bold">
            👤 My Profile
          </h2>

          <p className="mt-2 text-gray-400">
            Manage your account.
          </p>
        </Link>

        <Link
          href="/portal/statistics"
          className="block rounded-xl border border-blue-800 bg-[#0b1024] p-6 transition hover:border-blue-500"
        >
          <h2 className="text-xl font-bold">
            📊 My Statistics
          </h2>

          <p className="mt-2 text-gray-400">
            Coming Soon.
          </p>
        </Link>

        <Link
          href="/portal/news"
          className="block rounded-xl border border-blue-800 bg-[#0b1024] p-6 transition hover:border-blue-500"
        >
          <h2 className="text-xl font-bold">
            📢 Alliance News
          </h2>

          <p className="mt-2 text-gray-400">
            Coming Soon.
          </p>
        </Link>

        <div className="rounded-xl border border-blue-800 bg-[#0b1024] p-6">
          <h2 className="text-xl font-bold">
            🏆 Alliance Ranking
          </h2>

          <p className="mt-2 text-gray-400">
            Coming Soon.
          </p>
        </div>

      </div>
    </main>
  );
}