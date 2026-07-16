export default function AdminPage() {
  return (
    <main className="min-h-screen bg-[#050816] text-white p-8">
      <h1 className="text-4xl font-bold text-blue-400 mb-8">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

        <div className="rounded-xl border border-blue-800 bg-[#0b1024] p-6">
          <h2 className="text-xl font-bold mb-2">
            Pending Requests
          </h2>

          <p className="text-gray-400 mb-4">
            Review new member requests.
          </p>

          <button className="w-full rounded-lg bg-blue-600 hover:bg-blue-700 py-2">
            Open
          </button>
        </div>

        <div className="rounded-xl border border-blue-800 bg-[#0b1024] p-6">
          <h2 className="text-xl font-bold mb-2">
            Members
          </h2>

          <p className="text-gray-400 mb-4">
            Manage alliance members.
          </p>

          <button className="w-full rounded-lg bg-blue-600 hover:bg-blue-700 py-2">
            Open
          </button>
        </div>

        <div className="rounded-xl border border-blue-800 bg-[#0b1024] p-6">
          <h2 className="text-xl font-bold mb-2">
            Roles
          </h2>

          <p className="text-gray-400 mb-4">
            Manage roles and permissions.
          </p>

          <button className="w-full rounded-lg bg-blue-600 hover:bg-blue-700 py-2">
            Open
          </button>
        </div>

      </div>
    </main>
  );