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

    const totalMembers = await prisma.user.count({
      where: {
        approved: true,
      },
    });

    const submitted = await prisma.report.count({
      where: {
        cycleId: currentCycle.id,
      },
    });

    const missing = Math.max(totalMembers - submitted, 0);

    const completionRate =
      totalMembers === 0
        ? 0
        : Number(((submitted / totalMembers) * 100).toFixed(1));

    return {
      currentCycle: {
        id: currentCycle.id,
        name: currentCycle.name,
        weekNumber: currentCycle.weekNumber,
        startDate: currentCycle.startDate,
        endDate: currentCycle.endDate,
        isOpen: currentCycle.isOpen,
      },
      statistics: {
        totalMembers,
        submitted,
        missing,
        completionRate,
      },
    };
  });
}