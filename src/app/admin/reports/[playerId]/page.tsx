"use client";

import Link from "next/link";
import { use, useEffect, useState } from "react";

type Player = {
  id: string;
  playerId: string;
  inGameName: string;
  role: string;
  approved: boolean;
  createdAt: string;
};

type Report = {
  id: string;
  weekNumber: number;
  heroPower: string;
  firstSquadPower: string;
  firstSquadType: string;
  heroPowerImage: string;
  wallImage: string;
  createdAt: string;
};

export default function PlayerPage({
  params,
}: {
  params: Promise<{ playerId: string }>;
}) {
  const { playerId } = use(params);

  const [player, setPlayer] = useState<Player | null>(null);
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPlayer() {
      try {
        const res = await fetch(
          `/api/admin/reports/player/${playerId}`
        );

        const data = await res.json();

        setPlayer(data.player);
        setReports(data.reports);
      } finally {
        setLoading(false);
      }
    }

    loadPlayer();
  }, [playerId]);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#050816] text-white p-8">
        Loading...
      </main>
    );
  }

  if (!player) {
    return (
      <main className="min-h-screen bg-[#050816] text-white p-8">
        Player not found.
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#050816] text-white p-8">

      <Link
        href="/admin/reports"
        className="text-blue-400 hover:underline"
      >
        ← Back to Reports
      </Link>

      <div className="mt-6 rounded-xl border border-blue-800 bg-[#0b1024] p-6">

        <h1 className="text-3xl font-bold">
          {player.inGameName}
        </h1>

        <div className="mt-4 space-y-2 text-gray-300">

          <p>
            <strong>Player ID:</strong> {player.playerId}
          </p>

          <p>
            <strong>Role:</strong> {player.role}
          </p>

          <p>
            <strong>Approved:</strong>{" "}
            {player.approved ? "Yes" : "No"}
          </p>

          <p>
            <strong>Total Reports:</strong> {reports.length}
          </p>

        </div>

      </div>

      <h2 className="text-2xl font-bold mt-10 mb-6">
        Weekly Reports
      </h2>

      <div className="grid gap-4">

        {reports.map((report) => (
          <Link
            key={report.id}
            href={`/admin/reports/${player.playerId}/week/${report.weekNumber}`}
            className="rounded-xl border border-gray-700 bg-[#0b1024] p-5 hover:border-blue-500 transition"
          >
            <div className="flex items-center justify-between">

              <h3 className="font-semibold">
                Week {report.weekNumber}
              </h3>

              <span className="text-sm text-gray-400">
                {new Date(report.createdAt).toLocaleDateString()}
              </span>

            </div>

            <div className="mt-3 text-sm text-gray-300">
              Hero Power: {report.heroPower}
            </div>

            <div className="text-sm text-gray-300">
              Squad Power: {report.firstSquadPower}
            </div>

            <div className="text-sm text-gray-300">
              Squad Type: {report.firstSquadType}
            </div>

          </Link>
        ))}

      </div>

    </main>
  );
}