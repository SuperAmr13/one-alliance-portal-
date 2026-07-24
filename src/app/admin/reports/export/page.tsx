"use client";

import { useState } from "react";

export default function ExportReportsPage() {
    const [loading, setLoading] = useState(false);

    async function downloadExcel() {
        try {
            setLoading(true);

            const res = await fetch("/api/admin/reports/export");

            if (!res.ok) {
                alert("Failed to export reports.");
                return;
            }

            const blob = await res.blob();

            const url = window.URL.createObjectURL(blob);

            const a = document.createElement("a");
            a.href = url;
            a.download = "ONe-Alliance-Reports.xlsx";
            a.click();

            window.URL.revokeObjectURL(url);
        } catch (err) {
            console.error(err);
            alert("Export failed.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="min-h-screen bg-[#050816] text-white p-8">

            <h1 className="text-4xl font-bold text-green-400 mb-8">
                Export Reports
            </h1>

            <div className="rounded-xl border border-green-800 bg-[#0b1024] p-8 max-w-xl">

                <h2 className="text-2xl font-bold mb-4">
                    Excel Export
                </h2>

                <p className="text-gray-400 mb-8">
                    Download all alliance reports as an Excel workbook.
                </p>

                <button
                    onClick={downloadExcel}
                    disabled={loading}
                    className="rounded-lg bg-green-600 hover:bg-green-700 disabled:opacity-50 px-8 py-3 font-semibold"
                >
                    {loading ? "Preparing Excel..." : "Download Excel"}
                </button>

            </div>

        </main>
    );
}