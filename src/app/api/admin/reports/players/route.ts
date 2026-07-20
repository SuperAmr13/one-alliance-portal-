import { prisma } from "@/lib/prisma";
import { adminRoute, notFound } from "@/lib/api";

export async function GET() {
  return adminRoute(async () => {
    const currentCycle = await prisma.allianceCycle.findFirst({
      where: {
        isCurrent: true,
      },
    });

    if (!currentCycle) {
      notFound("No active alliance cycle found.");
    }

    const users = await prisma.user.findMany({
      orderBy: {
        inGameName: "asc",
      },
      include: {
        reports: {
          orderBy: {
            cycle: {
              weekNumber: "desc",
            },
          },
          include: {
            cycle: true,
          },
        },
      },
    });

    const players = users.map((user) => {
      const latestReport = user.reports[0];

      const currentCycleReport = user.reports.find(
        (report) => report.cycleId === currentCycle.id
      );

      return {
        id: user.id,
        playerId: user.playerId,
        inGameName: user.inGameName,
        role: user.role,

        totalReports: user.reports.length,

        submittedCurrentWeek: !!currentCycleReport,

        lastReportDate: latestReport?.createdAt ?? null,

        heroPower: latestReport
          ? latestReport.heroPower.toString()
          : null,

        firstSquadPower: latestReport
          ? latestReport.firstSquadPower.toString()
          : null,

        firstSquadType: latestReport?.firstSquadType ?? null,
      };
    });

    return {
      currentWeek: currentCycle.weekNumber,
      totalPlayers: players.length,
      players,
    };
  });
}