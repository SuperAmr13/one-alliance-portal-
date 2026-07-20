import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  adminRoute,
  badRequest,
} from "@/lib/api";

export async function GET(req: NextRequest) {
  return adminRoute(async () => {
    const { searchParams } = new URL(req.url);

    const fromWeek = Number(searchParams.get("from"));
    const toWeek = Number(searchParams.get("to"));

    if (!fromWeek || !toWeek) {
      badRequest("Both 'from' and 'to' weeks are required.");
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
          where: {
            weekNumber: {
              in: [fromWeek, toWeek],
            },
          },
        },
      },
    });

    const players = users
      .map((user) => {
        const fromReport = user.reports.find(
          (report) => report.weekNumber === fromWeek
        );

        const toReport = user.reports.find(
          (report) => report.weekNumber === toWeek
        );

        if (!fromReport || !toReport) {
          return null;
        }

        const heroGrowth =
          toReport.heroPower - fromReport.heroPower;

        const squadGrowth =
          toReport.firstSquadPower -
          fromReport.firstSquadPower;

        return {
          id: user.id,
          playerId: user.playerId,
          inGameName: user.inGameName,
          role: user.role,

          fromWeek,
          toWeek,

          heroPower: {
            from: fromReport.heroPower.toString(),
            to: toReport.heroPower.toString(),
            growth: heroGrowth.toString(),
          },

          firstSquadPower: {
            from: fromReport.firstSquadPower.toString(),
            to: toReport.firstSquadPower.toString(),
            growth: squadGrowth.toString(),
          },

          firstSquadType: toReport.firstSquadType,
        };
      })
      .filter(
        (
          player
        ): player is NonNullable<typeof player> => player !== null
      );

    players.sort((a, b) => {
      const aGrowth = BigInt(a.heroPower.growth);
      const bGrowth = BigInt(b.heroPower.growth);

      if (aGrowth === bGrowth) {
        return 0;
      }

      return aGrowth > bGrowth ? -1 : 1;
    });

    return {
      fromWeek,
      toWeek,
      totalPlayers: players.length,
      players,
    };
  });
}