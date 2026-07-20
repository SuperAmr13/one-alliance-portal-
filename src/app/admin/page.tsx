import Link from "next/link";
import AdminGuard from "@/components/AdminGuard";

export default function AdminPage() {
  return (
    <AdminGuard>
      <main className="min-h-screen bg-[#050816] text-white p-8">
        <h1 className="text-4xl font-bold text-blue-400 mb-8">
          Admin Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

          <div className="rounded-xl border border-blue-800 bg-[#0b1024] p-6 hover:border-blue-500 transition">
            <h2 className="text-xl font-bold mb-2">
              Pending Requests
            </h2>

            <p className="text-gray-400 mb-6">
              Review and approve new member requests.
            </p>

            <Link
              href="/admin/pending"
              className="block w-full rounded-lg bg-blue-600 hover:bg-blue-700 py-3 text-center font-semibold transition"
            >
              Open
            </Link>
          </div>

          <div className="rounded-xl border border-blue-800 bg-[#0b1024] p-6 hover:border-blue-500 transition">
            <h2 className="text-xl font-bold mb-2">
              Members
            </h2>

            <p className="text-gray-400 mb-6">
              View and manage alliance members.
            </p>

            <Link
              href="/admin/members"
              className="block w-full rounded-lg bg-blue-600 hover:bg-blue-700 py-3 text-center font-semibold transition"
            >
              <div className="rounded-xl border border-blue-800 bg-[#0b1024] p-6 hover:border-blue-500 transition">
                  <h2 className="text-xl font-bold mb-2">
                      Reports
                        </h2>

                          <p className="text-gray-400 mb-6">
                              View weekly reports and reports dashboard.
                                </p>

                                  <Link
                                      href="/admin/reports"
                                          className="block w-full rounded-lg bg-blue-600 hover:bg-blue-700 py-3 text-center font-semibold transition"
                                            >
                                                Open
                                                  </Link>
                                                  </div>
              Open
            </Link>
          </div>

        </div>
      </main>
    </AdminGuard>
  );
}