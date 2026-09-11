import { prisma } from "@/lib/prisma";
import { adminRoute, badRequest } from "@/lib/api";

function serializeParticipant(participant: any) {
  return {
    ...participant,
    firstSquadPowerSnapshot:
      participant.firstSquadPowerSnapshot !== null
        ? Number(participant.firstSquadPowerSnapshot)
        : null,
    sourceReport: participant.sourceReport
      ? {
          ...participant.sourceReport,
          firstSquadPower:
            participant.sourceReport.firstSquadPower !== null
              ? Number(
                  participant.sourceReport.firstSquadPower
                )
              : null,
        }
      : null,
  };
}

function calculateStage1(participants: any[]) {
  const eligibleParticipants = participants.filter(
    (participant) =>
      participant.user.approved === true &&
      participant.weeklyReportSubmitted === true &&
      participant.firstSquadPowerSnapshot !== null &&
      participant.punishedThisWeek === false &&
      participant.manualExclude === false
  );

  eligibleParticipants.sort((a, b) => {
    const powerA = Number(
      a.firstSquadPowerSnapshot ?? 0
    );

    const powerB = Number(
      b.firstSquadPowerSnapshot ?? 0
    );

    if (powerB !== powerA) {
      return powerB - powerA;
    }

    return a.user.inGameName.localeCompare(
      b.user.inGameName
    );
  });

  const top30 = eligibleParticipants
    .slice(0, 30)
    .map((participant, index) => ({
      rank: index + 1,
      ...serializeParticipant(participant),
    }));

  return {
    eligibleParticipants: eligibleParticipants.map(
      (participant, index) => ({
        rank: index + 1,
        ...serializeParticipant(participant),
      })
    ),
    top30,
  };
}

export async function GET(request: Request) {
  return adminRoute(async () => {
    const { searchParams } = new URL(request.url);

    const cycleId = searchParams.get("cycleId");

    if (!cycleId) {
      badRequest("Desert Storm cycle ID is required.");
    }

    const cycle = await prisma.desertStormCycle.findUnique({
      where: {
        id: cycleId,
      },
      include: {
        sourceAllianceCycle: true,
      },
    });

    if (!cycle) {
      badRequest("Desert Storm cycle not found.");
    }

    const participants =
      await prisma.desertStormParticipant.findMany({
        where: {
          cycleId: cycle.id,
        },
        include: {
          user: {
            select: {
              id: true,
              playerId: true,
              inGameName: true,
              role: true,
              approved: true,
            },
          },
          sourceReport: {
            select: {
              id: true,
              firstSquadPower: true,
              createdAt: true,
            },
          },
        },
        orderBy: [
          {
            firstSquadPowerSnapshot: "desc",
          },
          {
            user: {
              inGameName: "asc",
            },
          },
        ],
      });

    const serializedParticipants =
      participants.map(serializeParticipant);

    const stage1 = calculateStage1(participants);

    return {
      cycle: {
        id: cycle.id,
        cycleNumber: cycle.cycleNumber,
        name: cycle.name,
        status: cycle.status,
        sourceAllianceCycle: {
          id: cycle.sourceAllianceCycle.id,
          name: cycle.sourceAllianceCycle.name,
          weekNumber: cycle.sourceAllianceCycle.weekNumber,
        },
      },

      totalParticipants: serializedParticipants.length,

      eligibleCount:
        stage1.eligibleParticipants.length,

      top30Count: stage1.top30.length,

      participants: serializedParticipants,

      eligibleParticipants:
        stage1.eligibleParticipants,

      top30: stage1.top30,
    };
  });
}

export async function POST(request: Request) {
  return adminRoute(async () => {
    const body = await request.json();

    const cycleId = body?.cycleId;

    if (!cycleId) {
      badRequest("Desert Storm cycle ID is required.");
    }

    const cycle = await prisma.desertStormCycle.findUnique({
      where: {
        id: cycleId,
      },
      include: {
        sourceAllianceCycle: true,
      },
    });

    if (!cycle) {
      badRequest("Desert Storm cycle not found.");
    }

    const approvedUsers = await prisma.user.findMany({
      where: {
        approved: true,
      },
      select: {
        id: true,
      },
    });

    const reports = await prisma.report.findMany({
      where: {
        cycleId: cycle.sourceAllianceCycleId,
      },
      select: {
        id: true,
        userId: true,
        firstSquadPower: true,
      },
    });

    const reportsByUserId = new Map(
      reports.map((report) => [
        report.userId,
        report,
      ])
    );

    await prisma.$transaction(
      approvedUsers.map((user) => {
        const report = reportsByUserId.get(user.id);

        return prisma.desertStormParticipant.upsert({
          where: {
            cycleId_userId: {
              cycleId: cycle.id,
              userId: user.id,
            },
          },

          create: {
            cycleId: cycle.id,
            userId: user.id,

            sourceReportId: report?.id ?? null,

            firstSquadPowerSnapshot:
              report?.firstSquadPower ?? null,

            weeklyReportSubmitted: Boolean(report),
          },

          update: {
            sourceReportId: report?.id ?? null,

            firstSquadPowerSnapshot:
              report?.firstSquadPower ?? null,

            weeklyReportSubmitted: Boolean(report),
          },
        });
      })
    );

    const participants =
      await prisma.desertStormParticipant.findMany({
        where: {
          cycleId: cycle.id,
        },
        include: {
          user: {
            select: {
              id: true,
              playerId: true,
              inGameName: true,
              role: true,
              approved: true,
            },
          },
          sourceReport: {
            select: {
              id: true,
              firstSquadPower: true,
              createdAt: true,
            },
          },
        },
      });

    const stage1 = calculateStage1(participants);

    return {
      success: true,

      message:
        "Desert Storm participants have been synchronized from the source Alliance Cycle.",

      totalApprovedPlayers:
        approvedUsers.length,

      reportsFound: reports.length,

      totalParticipants:
        participants.length,

      eligibleCount:
        stage1.eligibleParticipants.length,

      top30Count:
        stage1.top30.length,

      participants:
        participants.map(serializeParticipant),

      eligibleParticipants:
        stage1.eligibleParticipants,

      top30:
        stage1.top30,
    };
  });
}