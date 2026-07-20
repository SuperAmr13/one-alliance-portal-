"use client";

import { useEffect, useState } from "react";

type Cycle = {
  id: string;
  name: string;
  weekNumber: number;
  isCurrent: boolean;
  isOpen: boolean;
  autoMode: boolean;
  manualOverride: boolean;
  startDate: string;
  endDate: string;
};

export default function CyclesPage() {
  const [cycle, setCycle] = useState<Cycle | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCycle();
  }, []);

  async function loadCycle() {
    try {
      const res = await fetch("/api/admin/cycles");
      const data = await res.json();

      setCycle(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function runAction(action: string) {
    try {
      const res = await fetch("/api/admin/cycles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ action }),
      });

      if (!res.ok) {
        throw new Error("Request failed");
      }

      await loadCycle();
    } catch (error) {
      console.error(error);
      alert("Failed to perform action.");
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-[#050816] p-8 text-white">
        <h1 className="text-4xl font-bold text-blue-400">
          Cycle Management
        </h1>

        <p className="mt-6 text-gray-400">
          Loading...
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#050816] p-8 text-white">
      <div className="mx-auto max-w-6xl">

        <h1 className="mb-8 text-4xl font-bold text-blue-400">
          Cycle Management
        </h1>

        {!cycle ? (
          <div className="rounded-2xl border border-yellow-700 bg-[#0b1024] p-8 text-center">
            <h2 className="mb-4 text-2xl font-bold">
              No Cycle Found
            </h2>

            <p className="mb-6 text-gray-400">
              Create the first cycle. It will start next Thursday and end on Saturday.
            </p>

            <button
              onClick={() => runAction("initialize")}
              className="rounded-xl bg-blue-600 px-8 py-4 font-bold transition hover:bg-blue-700"
            >
              🚀 Initialize First Cycle
            </button>
          </div>
        ) : (
          <>
            <div className="mb-8 rounded-2xl border border-blue-800 bg-[#0b1024] p-6">

              <h2 className="mb-6 text-2xl font-bold">
                Current Cycle
              </h2>

              <div className="grid gap-6 md:grid-cols-2">

                <div>
                  <p className="text-sm text-gray-400">Week Number</p>
                  <p className="mt-1 text-xl font-semibold">
                    {cycle.weekNumber}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-400">Status</p>

                  <p
                    className={`mt-1 font-semibold ${
                      cycle.isOpen ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {cycle.isOpen ? "Open" : "Closed"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-400">Auto Mode</p>

                  <p className="mt-1 font-semibold text-blue-400">
                    {cycle.autoMode ? "Enabled" : "Disabled"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-400">Manual Override</p>

                  <p className="mt-1 font-semibold text-yellow-400">
                    {cycle.manualOverride ? "Enabled" : "Disabled"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-400">Start Date</p>

                  <p className="mt-1">
                    {new Date(cycle.startDate).toLocaleDateString()}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-400">End Date</p>

                  <p className="mt-1">
                    {new Date(cycle.endDate).toLocaleDateString()}
                  </p>
                </div>

              </div>

            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">

              <button
                onClick={() => runAction("open")}
                className="rounded-xl bg-green-600 p-4 font-bold transition hover:bg-green-700"
              >
                🟢 Open Now
              </button>

              <button
                onClick={() => runAction("close")}
                className="rounded-xl bg-red-600 p-4 font-bold transition hover:bg-red-700"
              >
                🔴 Close Now
              </button>

              <button
                onClick={() => runAction("next")}
                className="rounded-xl bg-blue-600 p-4 font-bold transition hover:bg-blue-700"
              >
                ⏭️ Start Next Cycle
              </button>

              <button
                onClick={() => runAction("toggle-auto")}
                className="rounded-xl bg-yellow-500 p-4 font-bold text-black transition hover:bg-yellow-600"
              >
                🔄 Toggle Auto Mode
              </button>

            </div>
          </>
        )}

      </div>
    </main>
  );
}