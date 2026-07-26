type Member = {
    id: string;
    playerId: string;
    inGameName: string;
    role: "MEMBER" | "R4" | "R5" | "OWNER";
    approved: boolean;
    createdAt: string;
};

type Props = {
    member: Member | null;
    open: boolean;
    loading: boolean;
    onClose: () => void;
    onReset: () => void;
};

export default function ResetPasswordModal({
    member,
    open,
    loading,
    onClose,
    onReset,
}: Props) {
    if (!open || !member) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
            <div className="w-full max-w-md rounded-2xl border border-blue-600 bg-[#0f172a] p-6 shadow-2xl">
                <h2 className="text-2xl font-bold text-white">
                    Reset Password
                </h2>

                <p className="mt-4 text-zinc-300">
                    Are you sure you want to reset the password for:
                </p>

                <div className="mt-4 rounded-xl border border-blue-500/30 bg-[#050816] p-4">
                    <p className="text-lg font-bold text-blue-400">
                        {member.inGameName}
                    </p>

                    <p className="mt-1 font-mono text-sm text-zinc-400">
                        {member.playerId}
                    </p>
                </div>

                <p className="mt-4 text-sm text-red-400">
                    A temporary password will be generated and the player will be forced
                    to change it on the next login.
                </p>

                <div className="mt-6 flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        disabled={loading}
                        className="rounded-lg bg-zinc-700 px-4 py-2 text-white hover:bg-zinc-600"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={onReset}
                        disabled={loading}
                        className="rounded-lg bg-indigo-600 px-4 py-2 font-semibold text-white hover:bg-indigo-500 disabled:opacity-50"
                    >
                        {loading ? "Resetting..." : "Reset Password"}
                    </button>
                </div>
            </div>
        </div>
    );
}
