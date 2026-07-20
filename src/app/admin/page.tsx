import Link from "next/link";
import AdminGuard from "@/components/AdminGuard";

export default function AdminPage() {
  return (
    <AdminGuard>
      <main className="min-h-screen bg-[#050816] p-8 text-white">
        <h1 className="mb-8 text-4xl font-bold text-blue-400">
          Admin Dashboard
        </h1>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">

          <div className="rounded-xl border border-blue-800 bg-[#0b1024] p-6 transition hover:border-blue-500">
            <h2 className="mb-2 text-xl font-bold">
              Pending Requests
            </h2>

            <p className="mb-6 text-gray-400">
              Review and approve new member requests.
            </p>

            <Link
              href="/admin/pending"
              className="block w-full rounded-lg bg-blue-600 py-3 text-center font-semibold transition hover:bg-blue-700"
            >
              Open
            </Link>
          </div>

          <div className="rounded-xl border border-blue-800 bg-[#0b1024] p-6 transition hover:border-blue-500">
            <h2 className="mb-2 text-xl font-bold">
              Members
            </h2>

            <p className="mb-6 text-gray-400">
              View and manage alliance members.
            </p>

            <Link
              href="/admin/members"
              className="block w-full rounded-lg bg-blue-600 py-3 text-center font-semibold transition hover:bg-blue-700"
            >
              Open
            </Link>
          </div>

          <div className="rounded-xl border border-blue-800 bg-[#0b1024] p-6 transition hover:border-blue-500">
            <h2 className="mb-2 text-xl font-bold">
              Reports
            </h2>

            <p className="mb-6 text-gray-400">
              View weekly reports and reports dashboard.
            </p>

            <Link
              href="/admin/reports"
              className="block w-full rounded-lg bg-blue-600 py-3 text-center font-semibold transition hover:bg-blue-700"
            >
              Open
            </Link>
          </div>

          <div className="rounded-xl border border-blue-800 bg-[#0b1024] p-6 transition hover:border-blue-500">
            <h2 className="mb-2 text-xl font-bold">
              Cycle Management
            </h2>

            <p className="mb-6 text-gray-400">
              Manage report cycles, automatic mode and manual control.
            </p>

            <Link
              href="/admin/cycles"
              className="block w-full rounded-lg bg-blue-600 py-3 text-center font-semibold transition hover:bg-blue-700"
            >
              Open
            </Link>
          </div>

        </div>
      </main>
    </AdminGuard>
  );
}