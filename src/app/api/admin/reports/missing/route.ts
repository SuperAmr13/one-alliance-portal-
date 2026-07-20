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
      where: {
        approved: true,
      },
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

    const missingPlayers = users
      .filter(
        (user) =>
          !user.reports.some(
            (report) => report.cycleId === currentCycle.id
          )
      )
      .map((user) => {
        const lastReport = user.reports[0];

        return {
          id: user.id,
          playerId: user.playerId,
          inGameName: user.inGameName,
          role: user.role,

          lastReportWeek: lastReport?.cycle.weekNumber ?? null,
          lastReportDate: lastReport?.createdAt ?? null,

          heroPower: lastReport
            ? lastReport.heroPower.toString()
            : null,

          firstSquadPower: lastReport
            ? lastReport.firstSquadPower.toString()
            : null,

          firstSquadType: lastReport?.firstSquadType ?? null,
        };
      });

    return {
      currentWeek: currentCycle.weekNumber,
      totalMissing: missingPlayers.length,
      players: missingPlayers,
    };
  });
}