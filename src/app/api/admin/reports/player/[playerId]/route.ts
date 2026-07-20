import { prisma } from "@/lib/prisma";
import { adminRoute, notFound } from "@/lib/api";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ playerId: string }> }
) {
  return adminRoute(async () => {
    const { playerId } = await params;

    const player = await prisma.user.findUnique({
      where: {
        playerId,
      },
      include: {
        reports: {
          orderBy: {
            cycle: {
              weekNumber: "asc",
            },
          },
          include: {
            cycle: true,
          },
        },
      },
    });

    if (!player) {
      notFound("Player not found.");
    }

    return {
      player: {
        id: player.id,
        playerId: player.playerId,
        inGameName: player.inGameName,
        role: player.role,
        approved: player.approved,
      },

      reports: player.reports.map((report) => ({
        id: report.id,
        cycleId: report.cycleId,
        weekNumber: report.cycle.weekNumber,
        heroPower: report.heroPower.toString(),
        firstSquadPower: report.firstSquadPower.toString(),
        firstSquadType: report.firstSquadType,
        heroPowerImage: report.heroPowerImage,
        wallImage: report.wallImage,
        createdAt: report.createdAt,
      })),
    };
  });
}