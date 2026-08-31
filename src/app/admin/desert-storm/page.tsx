"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type AllianceCycle = {
  id: string;
  name: string;
  weekNumber: number;
  isCurrent: boolean;
  startDate: string;
  endDate: string;
};

type DesertStormCycle = {
  id: string;
  cycleNumber: number;
  name: string;
  votingDate: string;
  votingOpenAt: string;
  votingCloseAt: string;
  eventDate: string;
  status: string;
  mapPublished: boolean;
  sourceAllianceCycle: AllianceCycle;
};

export default function DesertStormAdminPage() {
  const [allianceCycles, setAllianceCycles] = useState<
    AllianceCycle[]
  >([]);

  const [desertStormCycles, setDesertStormCycles] = useState<
    DesertStormCycle[]
  >([]);

  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState("");

  const [name, setName] = useState("");
  const [sourceAllianceCycleId, setSourceAllianceCycleId] =
    useState("");

  const [votingDate, setVotingDate] = useState("");
  const [votingOpenAt, setVotingOpenAt] = useState("");
  const [votingCloseAt, setVotingCloseAt] = useState("");
  const [eventDate, setEventDate] = useState("");

  async function loadData() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "/api/admin/desert-storm/cycles"
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to load data.");
      }

      setAllianceCycles(data.allianceCycles);
      setDesertStormCycles(data.desertStormCycles);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  async function handleCreate(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    try {
      setCreating(true);
      setError("");

      const response = await fetch(
        "/api/admin/desert-storm/cycles",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            sourceAllianceCycleId,
            votingDate,
            votingOpenAt,
            votingCloseAt,
            eventDate,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Failed to create Desert Storm cycle."
        );
      }

      setName("");
      setSourceAllianceCycleId("");
      setVotingDate("");
      setVotingOpenAt("");
      setVotingCloseAt("");
      setEventDate("");

      await loadData();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );
    } finally {
      setCreating(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#050816] px-5 py-8 text-white">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8">
          <Link
            href="/admin"
            className="text-sm text-blue-400 hover:text-blue-300"
          >
            ← Back to Admin Dashboard
          </Link>

          <h1 className="mt-4 text-3xl font-bold">
            🏜️ Desert Storm Management
          </h1>

          <p className="mt-2 text-gray-400">
            Create and manage Desert Storm cycles.
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-xl border border-red-700 bg-red-950/40 p-4 text-red-300">
            {error}
          </div>
        )}

        <section className="rounded-2xl border border-blue-900 bg-[#0b1024] p-5">
          <h2 className="text-xl font-bold">
            Create Desert Storm Cycle
          </h2>

          <p className="mt-2 text-sm text-gray-400">
            Each Desert Storm cycle is linked to one Alliance Cycle.
          </p>

          <form
            onSubmit={handleCreate}
            className="mt-6 space-y-5"
          >
            <div>
              <label className="mb-2 block text-sm text-gray-300">
                Cycle Name
              </label>

              <input
                value={name}
                onChange={(event) =>
                  setName(event.target.value)
                }
                placeholder="Desert Storm 1"
                className="w-full rounded-xl border border-blue-900 bg-[#050816] p-3 text-white outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-gray-300">
                Source Alliance Cycle
              </label>

              <select
                required
                value={sourceAllianceCycleId}
                onChange={(event) =>
                  setSourceAllianceCycleId(
                    event.target.value
                  )
                }
                className="w-full rounded-xl border border-blue-900 bg-[#050816] p-3 text-white outline-none focus:border-blue-500"
              >
                <option value="">
                  Select Alliance Cycle
                </option>

                {allianceCycles.map((cycle) => (
                  <option
                    key={cycle.id}
                    value={cycle.id}
                  >
                    Week {cycle.weekNumber} — {cycle.name}
                    {cycle.isCurrent ? " (Current)" : ""}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm text-gray-300">
                  Voting Date
                </label>

                <input
                  required
                  type="date"
                  value={votingDate}
                  onChange={(event) =>
                    setVotingDate(event.target.value)
                  }
                  className="w-full rounded-xl border border-blue-900 bg-[#050816] p-3 text-white outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-gray-300">
                  Event Date
                </label>

                <input
                  required
                  type="date"
                  value={eventDate}
                  onChange={(event) =>
                    setEventDate(event.target.value)
                  }
                  className="w-full rounded-xl border border-blue-900 bg-[#050816] p-3 text-white outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-gray-300">
                  Voting Opens
                </label>

                <input
                  required
                  type="datetime-local"
                  value={votingOpenAt}
                  onChange={(event) =>
                    setVotingOpenAt(event.target.value)
                  }
                  className="w-full rounded-xl border border-blue-900 bg-[#050816] p-3 text-white outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-gray-300">
                  Voting Closes
                </label>

                <input
                  required
                  type="datetime-local"
                  value={votingCloseAt}
                  onChange={(event) =>
                    setVotingCloseAt(event.target.value)
                  }
                  className="w-full rounded-xl border border-blue-900 bg-[#050816] p-3 text-white outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={creating}
              className="w-full rounded-xl bg-blue-600 p-4 font-bold transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {creating
                ? "Creating..."
                : "Create Desert Storm Cycle"}
            </button>
          </form>
        </section>

        <section className="mt-8">
          <h2 className="mb-5 text-2xl font-bold">
            Desert Storm Cycles
          </h2>

          {loading ? (
            <div className="rounded-xl border border-blue-900 bg-[#0b1024] p-6 text-gray-400">
              Loading...
            </div>
          ) : desertStormCycles.length === 0 ? (
            <div className="rounded-xl border border-blue-900 bg-[#0b1024] p-6 text-gray-400">
              No Desert Storm cycles created yet.
            </div>
          ) : (
            <div className="space-y-4">
              {desertStormCycles.map((cycle) => (
                <div
                  key={cycle.id}
                  className="rounded-2xl border border-blue-900 bg-[#0b1024] p-5"
                >
                  <div className="flex flex-col justify-between gap-4 sm:flex-row">
                    <div>
                      <h3 className="text-xl font-bold">
                        🏜️ {cycle.name}
                      </h3>

                      <p className="mt-2 text-gray-400">
                        Linked to Week{" "}
                        {cycle.sourceAllianceCycle.weekNumber}
                      </p>

                      <p className="mt-1 text-sm text-gray-500">
                        Status: {cycle.status}
                      </p>
                    </div>

                    <div className="text-sm text-gray-400">
                      <p>
                        🗳️ Voting:{" "}
                        {new Date(
                          cycle.votingDate
                        ).toLocaleDateString()}
                      </p>

                      <p className="mt-1">
                        ⚔️ Event:{" "}
                        {new Date(
                          cycle.eventDate
                        ).toLocaleDateString()}
                      </p>

                      <p className="mt-1">
                        🗺️ Map:{" "}
                        {cycle.mapPublished
                          ? "Published ✅"
                          : "Not Published"}
                      </p>
                    </div>
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