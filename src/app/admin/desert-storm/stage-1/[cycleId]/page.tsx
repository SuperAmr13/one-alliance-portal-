"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Player = {
  rank: number;
  id: string;
  user: {
    id: string;
    playerId: string;
    inGameName: string;
    role: "MEMBER" | "R4" | "R5" | "OWNER";
    approved: boolean;
  };
  firstSquadPowerSnapshot: number | null;
  weeklyReportSubmitted: boolean;
  punishedThisWeek: boolean;
  manualExclude: boolean;
};

type Stage1Response = {
  cycle: {
    id: string;
    cycleNumber: number;
    name: string;
    status: string;
    sourceAllianceCycle: {
      id: string;
      name: string;
      weekNumber: number;
    };
  };
  totalParticipants: number;
  eligibleCount: number;
  top30Count: number;
  participants: Player[];
  eligibleParticipants: Player[];
  top30: Player[];
};

export default function Stage1Page({
  params,
}: {
  params: Promise<{ cycleId: string }>;
}) {
  const [cycleId, setCycleId] = useState("");
  const [data, setData] = useState<Stage1Response | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const resolvedParams = await params;
        setCycleId(resolvedParams.cycleId);

        const response = await fetch(
          `/api/admin/desert-storm/stage-1?cycleId=${resolvedParams.cycleId}`,
          {
            cache: "no-store",
          }
        );

        const result = await response.json();

        if (!response.ok) {
          throw new Error(
            result?.error ?? "Failed to load Stage 1 results."
          );
        }

        setData(result);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Failed to load Stage 1 results."
        );
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [params]);

  function formatPower(value: number | null) {
    return value !== null ? value.toLocaleString() : "-";
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-[#050816] px-4 py-8 text-white">
        <div className="mx-auto max-w-5xl">
          <div className="rounded-2xl border border-blue-800 bg-[#0b1024] p-8 text-center text-gray-400">
            Loading Stage 1 results...
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-[#050816] px-4 py-8 text-white">
        <div className="mx-auto max-w-5xl">
          <Link
            href="/admin/desert-storm"
            className="mb-6 inline-flex rounded-xl border border-blue-800 px-4 py-2 text-sm text-blue-300 transition hover:bg-blue-950"
          >
            ← Back to Desert Storm
          </Link>

          <div className="rounded-2xl border border-red-800 bg-red-950/20 p-6 text-red-300">
            {error}
          </div>
        </div>
      </main>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <main className="min-h-screen bg-[#050816] px-4 py-8 text-white">
      <div className="mx-auto max-w-5xl space-y-6">

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-blue-400">
              Stage 1 Players
            </h1>

            <p className="mt-1 text-gray-400">
              {data.cycle.name}
            </p>

            <p className="mt-1 text-sm text-gray-500">
              Source: {data.cycle.sourceAllianceCycle.name}
              {" · "}
              Week {data.cycle.sourceAllianceCycle.weekNumber}
            </p>
          </div>

          <Link
            href="/admin/desert-storm"
            className="rounded-xl border border-blue-800 px-4 py-2 text-sm font-semibold text-blue-300 transition hover:bg-blue-950"
          >
            ← Back
          </Link>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-2xl border border-blue-800 bg-[#0b1024] p-4 text-center">
            <p className="text-xs text-gray-400">
              Participants
            </p>

            <p className="mt-1 text-2xl font-bold text-white">
              {data.totalParticipants}
            </p>
          </div>

          <div className="rounded-2xl border border-green-800 bg-[#0b1024] p-4 text-center">
            <p className="text-xs text-gray-400">
              Eligible
            </p>

            <p className="mt-1 text-2xl font-bold text-green-400">
              {data.eligibleCount}
            </p>
          </div>

          <div className="rounded-2xl border border-yellow-800 bg-[#0b1024] p-4 text-center">
            <p className="text-xs text-gray-400">
              Top 30
            </p>

            <p className="mt-1 text-2xl font-bold text-yellow-400">
              {data.top30Count}
            </p>
          </div>
        </div>

        <section className="rounded-2xl border border-blue-800 bg-[#0b1024] p-4 sm:p-6">
          <div className="mb-5">
            <h2 className="text-xl font-bold text-green-400">
              Eligible Players
            </h2>

            <p className="mt-1 text-sm text-gray-400">
              Players who passed all Stage 1 eligibility rules.
            </p>
          </div>

          {data.eligibleParticipants.length === 0 ? (
            <div className="rounded-xl border border-red-900 bg-red-950/20 p-5 text-center text-red-300">
              No eligible players found.
            </div>
          ) : (
            <div className="space-y-2">
              {data.eligibleParticipants.map((player) => (
                <div
                  key={player.id}
                  className="flex flex-col gap-3 rounded-xl border border-blue-900 bg-[#111933] px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-950 font-bold text-green-400">
                      {player.rank}
                    </div>

                    <div className="min-w-0">
                      <p className="truncate font-semibold text-white">
                        {player.user.inGameName}
                      </p>

                      <p className="text-xs text-gray-400">
                        {player.user.role}
                        {" · "}
                        ID {player.user.playerId}
                      </p>
                    </div>
                  </div>

                  <div className="text-left sm:text-right">
                    <p className="font-bold text-blue-300">
                      {formatPower(
                        player.firstSquadPowerSnapshot
                      )}
                    </p>

                    <p className="text-xs text-gray-500">
                      First Squad Power
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="rounded-2xl border border-yellow-800 bg-[#0b1024] p-4 sm:p-6">
          <div className="mb-5">
            <h2 className="text-xl font-bold text-yellow-400">
              Stage 1 — Top 30
            </h2>

            <p className="mt-1 text-sm text-gray-400">
              Automatic ranking by First Squad Power.
            </p>
          </div>

          {data.top30.length === 0 ? (
            <div className="rounded-xl border border-red-900 bg-red-950/20 p-5 text-center text-red-300">
              No players qualified for the Top 30.
            </div>
          ) : (
            <div className="space-y-2">
              {data.top30.map((player) => (
                <div
                  key={player.id}
                  className="flex flex-col gap-3 rounded-xl border border-yellow-900 bg-[#111933] px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-yellow-950 font-bold text-yellow-400">
                      {player.rank}
                    </div>

                    <div className="min-w-0">
                      <p className="truncate font-semibold text-white">
                        {player.user.inGameName}
                      </p>

                      <p className="text-xs text-gray-400">
                        {player.user.role}
                        {" · "}
                        ID {player.user.playerId}
                      </p>
                    </div>
                  </div>

                  <div className="text-left sm:text-right">
                    <p className="text-lg font-bold text-yellow-400">
                      {formatPower(
                        player.firstSquadPowerSnapshot
                      )}
                    </p>

                    <p className="text-xs text-gray-500">
                      First Squad Power
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

      </div>
    </main>
  );
}
