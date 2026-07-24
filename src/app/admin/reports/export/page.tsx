"use client";

import { useEffect, useState } from "react";

type Cycle = {
  id: string;
  weekNumber: number;
};

export default function ExportReportsPage() {
  const [mode, setMode] = useState("current");
  const [weeks, setWeeks] = useState<Cycle[]>([]);
  const [weekId, setWeekId] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/admin/reports/cycles")
      .then((r) => r.json())
      .then((data) => {
        setWeeks(data);

        if (data.length > 0) {
          setWeekId(data[data.length - 1].id);
        }
      });
  }, []);

  async function downloadExcel() {
    setLoading(true);

    try {
      let url = "/api/admin/reports/export";

      if (mode === "current") {
        url += "?mode=current";
      }

      if (mode === "all") {
        url += "?mode=all";
      }

      if (mode === "week") {
        url += `?mode=week&id=${weekId}`;
      }

      const res = await fetch(url);

      if (!res.ok) {
        alert("Export failed.");
        return;
      }

      const blob = await res.blob();

      const objectUrl = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = objectUrl;
      a.download = "AllianceReports.xlsx";
      a.click();

      window.URL.revokeObjectURL(objectUrl);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#050816] text-white p-8">

      <h1 className="text-4xl font-bold text-green-400 mb-10">
        Export Reports
      </h1>

      <div className="rounded-xl border border-green-800 bg-[#0b1024] p-8 max-w-xl">

        <div className="space-y-5">

          <label className="flex gap-3 items-center">
            <input
              type="radio"
              checked={mode === "current"}
              onChange={() => setMode("current")}
            />
            Current Week
          </label>

          <label className="flex gap-3 items-center">
            <input
              type="radio"
              checked={mode === "week"}
              onChange={() => setMode("week")}
            />
            Specific Week
          </label>

          {mode === "week" && (
            <select
              value={weekId}
              onChange={(e) => setWeekId(e.target.value)}
              className="w-full rounded-lg bg-black border border-gray-700 p-3"
            >
              {weeks.map((week) => (
                <option key={week.id} value={week.id}>
                  Week {week.weekNumber}
                </option>
              ))}
            </select>
          )}

          <label className="flex gap-3 items-center">
            <input
              type="radio"
              checked={mode === "all"}
              onChange={() => setMode("all")}
            />
            All Weeks
          </label>

        </div>

        <button
          onClick={downloadExcel}
          disabled={loading}
          className="mt-8 bg-green-600 hover:bg-green-700 rounded-lg px-8 py-3 font-bold"
        >
          {loading ? "Preparing..." : "Download Excel"}
        </button>

      </div>

    </main>
  );
}