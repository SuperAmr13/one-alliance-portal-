import Link from "next/link";

type PlayerCardProps = {
  playerId: string;
  inGameName: string;
  role: "OWNER" | "R5" | "R4" | "MEMBER";
  totalReports: number;
  submittedCurrentWeek: boolean;
  lastReportDate: string | null;
};

export default function PlayerCard({
  playerId,
  inGameName,
  role,
  totalReports,
  submittedCurrentWeek,
  lastReportDate,
}: PlayerCardProps) {
  const roleColor = {
    OWNER: "bg-yellow-600",
    R5: "bg-red-600",
    R4: "bg-purple-600",
    MEMBER: "bg-blue-600",
  };

  return (
    <Link href={`/admin/reports/${playerId}`}>
      <div
        className={`rounded-2xl p-5 bg-[#0b1024] border transition-all duration-300 hover:scale-[1.02] hover:shadow-xl cursor-pointer ${
          submittedCurrentWeek
            ? "border-green-600 hover:border-green-400"
            : "border-red-600 hover:border-red-400"
        }`}
      >
        <div className="flex items-center justify-between mb-5">
          <span
            className={`rounded-full px-3 py-1 text-xs font-bold text-white ${
              submittedCurrentWeek ? "bg-green-600" : "bg-red-600"
            }`}
          >
            {submittedCurrentWeek ? "Submitted" : "Missing"}
          </span>

          <span
            className={`rounded-full px-3 py-1 text-xs font-bold text-white ${roleColor[role]}`}
          >
            {role}
          </span>
        </div>

        <h2 className="text-xl font-bold text-white">
          {inGameName}
        </h2>

        <p className="mt-1 text-sm text-gray-400">
          Player ID
        </p>

        <p className="text-sm text-gray-300 break-all">
          {playerId}
        </p>

        <div className="mt-6 space-y-3">

          <div className="flex justify-between">
            <span className="text-gray-400">
              Reports
            </span>

            <span className="font-semibold">
              {totalReports}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-400">
              Last Report
            </span>

            <span className="font-semibold">
              {lastReportDate
                ? new Date(lastReportDate).toLocaleDateString()
                : "-"}
            </span>
          </div>

        </div>

        <div className="mt-6 border-t border-gray-700 pt-4 text-center text-sm font-semibold text-blue-400">
          Tap to view reports →
        </div>
      </div>
    </Link>
  );
}