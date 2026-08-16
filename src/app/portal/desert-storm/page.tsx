"use client";

import { useEffect, useState } from "react";

type Cycle = {
  id: string;
  cycleNumber: number;
  name: string;
  votingDate: string;
  votingOpenAt: string;
  votingCloseAt: string;
  eventDate: string;
  status: string;
  mapPublished: boolean;
};

type Participant = {
  vote: "YES" | "NO" | null;
} | null;

type DsbResponse = {
  cycle: Cycle | null;
  participant: Participant;
  error?: string;
};

export default function DesertStormPage() {
  const [data, setData] = useState<DsbResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [voting, setVoting] = useState(false);
  const [error, setError] = useState("");

  async function loadCycle() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("/api/desert-storm", {
        cache: "no-store",
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.error || "Failed to load Desert Storm.");
        return;
      }

      setData(result);
    } catch {
      setError("Failed to load Desert Storm.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCycle();
  }, []);

  async function submitVote(vote: "YES" | "NO") {
    try {
      setVoting(true);
      setError("");

      const response = await fetch("/api/desert-storm/vote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ vote }),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.error || "Failed to submit vote.");
        return;
      }

      await loadCycle();
    } catch {
      setError("Failed to submit vote.");
    } finally {
      setVoting(false);
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-[#050816] px-5 py-8 text-white">
        <div className="mx-auto max-w-2xl">
          <p className="text-gray-400">Loading Desert Storm...</p>
        </div>
      </main>
    );
  }

  if (error && !data) {
    return (
      <main className="min-h-screen bg-[#050816] px-5 py-8 text-white">
        <div className="mx-auto max-w-2xl">
          <div className="rounded-xl border border-red-800 bg-red-950/30 p-5">
            <p className="text-red-400">{error}</p>
          </div>
        </div>
      </main>
    );
  }

  if (!data?.cycle) {
    return (
      <main className="min-h-screen bg-[#050816] px-5 py-8 text-white">
        <div className="mx-auto max-w-2xl">
          <h1 className="text-3xl font-bold text-blue-400">
            🌪️ Desert Storm
          </h1>

          <div className="mt-8 rounded-xl border border-blue-800 bg-[#0b1024] p-6">
            <p className="text-gray-400">
              There is no active Desert Storm cycle right now.
            </p>
          </div>
        </div>
      </main>
    );
  }

  const { cycle, participant } = data;

  const hasVoted = participant?.vote === "YES" || participant?.vote === "NO";

  return (
    <main className="min-h-screen bg-[#050816] px-5 py-8 text-white">
      <div className="mx-auto max-w-2xl">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-400">
            Weekly Event
          </p>

          <h1 className="mt-2 text-3xl font-bold">
            🌪️ Desert Storm
          </h1>

          <p className="mt-2 text-gray-400">
            {cycle.name}
          </p>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4">
          <div className="rounded-xl border border-blue-800 bg-[#0b1024] p-4">
            <p className="text-sm text-gray-400">Cycle</p>
            <p className="mt-2 text-xl font-bold">
              #{cycle.cycleNumber}
            </p>
          </div>

          <div className="rounded-xl border border-blue-800 bg-[#0b1024] p-4">
            <p className="text-sm text-gray-400">Event</p>
            <p className="mt-2 text-xl font-bold">
              {new Date(cycle.eventDate).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="mt-6 rounded-xl border border-blue-800 bg-[#0b1024] p-6">
          <h2 className="text-xl font-bold">
            🗳️ Participation
          </h2>

          <p className="mt-2 text-gray-400">
            Please select whether you will participate in this
            Desert Storm event.
          </p>

          {hasVoted ? (
            <div className="mt-6 rounded-lg border border-green-800 bg-green-950/20 p-4">
              <p className="text-sm text-gray-400">
                Your vote
              </p>

              <p className="mt-2 text-xl font-bold">
                {participant.vote === "YES"
                  ? "YES — I will participate ✅"
                  : "NO — I won't participate ❌"}
              </p>
            </div>
          ) : (
            <div className="mt-6 grid grid-cols-2 gap-4">
              <button
                type="button"
                disabled={voting}
                onClick={() => submitVote("YES")}
                className="rounded-xl border border-green-700 bg-green-950/30 p-5 font-bold transition hover:border-green-400 disabled:cursor-not-allowed disabled:opacity-50"
              >
                YES
                <span className="mt-1 block text-sm font-normal text-gray-400">
                  I will participate
                </span>
              </button>

              <button
                type="button"
                disabled={voting}
                onClick={() => submitVote("NO")}
                className="rounded-xl border border-red-700 bg-red-950/30 p-5 font-bold transition hover:border-red-400 disabled:cursor-not-allowed disabled:opacity-50"
              >
                NO
                <span className="mt-1 block text-sm font-normal text-gray-400">
                  I won't participate
                </span>
              </button>
            </div>
          )}

          {error && (
            <p className="mt-4 text-sm text-red-400">
              {error}
            </p>
          )}
        </div>

        {cycle.mapPublished && (
          <div className="mt-6 rounded-xl border border-blue-800 bg-[#0b1024] p-6">
            <h2 className="text-xl font-bold">
              🗺️ Desert Storm Map
            </h2>

            <p className="mt-2 text-gray-400">
              The Desert Storm map has been published.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
