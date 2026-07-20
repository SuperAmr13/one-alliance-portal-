"use client";

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
      <main className="min-h-screen bg-[#050816] text-white p-8">
        <h1 className="text-4xl font-bold text-blue-400">
          Reports Dashboard
        </h1>

        <p className="text-gray-400 mt-6">
          Loading...
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#050816] text-white p-8">

      <h1 className="text-4xl font-bold text-blue-400 mb-8">
        Reports Dashboard
      </h1>

      <div className="rounded-xl border border-blue-800 bg-[#0b1024] p-6 mb-8">

        <h2 className="text-2xl font-bold mb-2">
          Alliance Cycle
        </h2>

        <p className="text-gray-400">
          {summary?.currentCycle.name}
        </p>

        <p className="text-blue-400 mt-2">
          Week {summary?.currentCycle.weekNumber}
        </p>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        <div className="rounded-xl border border-blue-800 bg-[#0b1024] p-6">
          <p className="text-gray-400">Members</p>

          <h2 className="text-3xl font-bold mt-2">
            {summary?.statistics.totalMembers}
          </h2>
        </div>

        <div className="rounded-xl border border-green-700 bg-[#0b1024] p-6">
          <p className="text-gray-400">Submitted</p>

          <h2 className="text-3xl font-bold text-green-400 mt-2">
            {summary?.statistics.submitted}
          </h2>
        </div>

        <div className="rounded-xl border border-red-700 bg-[#0b1024] p-6">
          <p className="text-gray-400">Missing</p>

          <h2 className="text-3xl font-bold text-red-400 mt-2">
            {summary?.statistics.missing}
          </h2>
        </div>

        <div className="rounded-xl border border-yellow-700 bg-[#0b1024] p-6">
          <p className="text-gray-400">
            Completion
          </p>

          <h2 className="text-3xl font-bold text-yellow-400 mt-2">
            {summary?.statistics.completionRate}%
          </h2>
        </div>

      </div>

    </main>
  );
}