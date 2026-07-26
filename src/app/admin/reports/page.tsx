"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Summary = {
  currentCycle: {
    weekNumber: number;
    name: string;
    isOpen: boolean;
  };

  statistics: {
    totalMembers: number;
    submitted: number;
    missing: number;
    completionRate: number;
  };
};

export default function ReportsPage() {
  const [summary, setSummary] = useState<Summary | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSummary();
  }, []);

  async function loadSummary() {
    try {
      const res = await fetch("/api/admin/reports/summary");
      const data = await res.json();
      setSummary(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-[#050816] p-6 text-white">
        <h1 className="text-3xl font-bold text-blue-400">
          Reports Dashboard
        </h1>

        <p className="mt-4 text-gray-400">
          Loading...
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#050816] p-6 text-white">

      <h1 className="text-3xl font-bold text-blue-400">
        Reports Dashboard
      </h1>

      <p className="mt-2 mb-6 text-gray-400">
        Manage alliance reports and weekly activity.
      </p>

      <div className="mb-8 rounded-2xl border border-blue-800 bg-[#0b1024] p-5">

        <div className="flex items-center justify-between">

          <div>
            <h2 className="text-xl font-bold">
              Week {summary?.currentCycle.weekNumber}
            </h2>

            <p className="text-gray-400">
              {summary?.currentCycle.name}
            </p>
          </div>

          <span
            className={`rounded-full px-3 py-1 text-sm font-semibold ${
              summary?.currentCycle.isOpen
                ? "bg-green-600"
                : "bg-red-600"
            }`}
          >
            {summary?.currentCycle.isOpen ? "Open" : "Closed"}
          </span>

        </div>

        <div className="mt-6 grid grid-cols-2 gap-4">

          <div>
            <p className="text-gray-500 text-sm">
              Members
            </p>

            <p className="text-2xl font-bold">
              👥 {summary?.statistics.totalMembers}
            </p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">
              Submitted
            </p>

            <p className="text-2xl font-bold text-green-400">
              ✅ {summary?.statistics.submitted}
            </p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">
              Missing
            </p>

            <p className="text-2xl font-bold text-red-400">
              ❌ {summary?.statistics.missing}
            </p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">
              Completion
            </p>

            <p className="text-2xl font-bold text-yellow-400">
              📊 {summary?.statistics.completionRate}%
            </p>
          </div>

        </div>

      </div>

      <h2 className="mb-5 text-2xl font-bold text-blue-400">
        Quick Actions
      </h2>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

        <Link
          href="/admin/reports/players"
          className="rounded-2xl border border-blue-700 bg-[#0b1024] p-6 transition hover:scale-[1.02] hover:border-blue-500"
        >
          <div className="text-4xl">👥</div>

          <h3 className="mt-4 text-xl font-bold">
            Players Reports
          </h3>

          <p className="mt-2 text-gray-400">
            Browse players and open all reports.
          </p>
        </Link>

        <Link
          href="/admin/reports/missing"
          className="rounded-2xl border border-red-700 bg-[#0b1024] p-6 transition hover:scale-[1.02] hover:border-red-500"
        >
          <div className="text-4xl">📄</div>

          <h3 className="mt-4 text-xl font-bold">
            Missing Reports
          </h3>

          <p className="mt-2 text-gray-400">
            View members who missed their report.
          </p>
        </Link>

        <Link
          href="/admin/reports/compare"
          className="rounded-2xl border border-purple-700 bg-[#0b1024] p-6 transition hover:scale-[1.02] hover:border-purple-500"
        >
          <div className="text-4xl">📊</div>

          <h3 className="mt-4 text-xl font-bold">
            Compare Reports
          </h3>

          <p className="mt-2 text-gray-400">
            Compare reports between weeks.
          </p>
        </Link>

        <Link
          href="/admin/reports/export"
          className="rounded-2xl border border-green-700 bg-[#0b1024] p-6 transition hover:scale-[1.02] hover:border-green-500 md:col-span-2"
        >
          <div className="text-4xl">📥</div>

          <h3 className="mt-4 text-xl font-bold">
            Export Reports
          </h3>

          <p className="mt-2 text-gray-400">
            Download all reports as an Excel file.
          </p>
        </Link>

      </div>

    </main>
  );
}