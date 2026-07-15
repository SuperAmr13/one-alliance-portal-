import Button from "@/components/ui/Button";

export default function LoginPage() {
    return (
        <main className="min-h-screen bg-[#050816] flex items-center justify-center px-6">
            <div className="w-full max-w-md bg-[#0b1024] border border-blue-900 rounded-2xl p-8 shadow-2xl">

                <h1 className="text-4xl text-center font-bold text-blue-400 mb-2">
                    Enter Portal
                </h1>

                <p className="text-center text-gray-400 mb-8">
                    Welcome back, warrior.
                </p>

                <input
                    type="text"
                    placeholder="Player ID"
                    className="w-full mb-4 rounded-lg bg-[#111827] border border-blue-800 px-4 py-3 text-white outline-none"
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="w-full mb-6 rounded-lg bg-[#111827] border border-blue-800 px-4 py-3 text-white outline-none"
                />

                <div className="w-full">
                      <button
                          className="w-full rounded-lg bg-blue-600 hover:bg-blue-700 py-3 text-white font-semibold transition"
                            >
                                Login
                                  </button>
                                  </div>

            </div>
        </main>
    );
}