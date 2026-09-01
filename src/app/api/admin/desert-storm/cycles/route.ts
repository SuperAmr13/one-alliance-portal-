import { prisma } from "@/lib/prisma";
import { adminRoute, badRequest } from "@/lib/api";

export async function GET() {
    return adminRoute(async () => {
        const [allianceCycles, desertStormCycles] = await Promise.all([
            prisma.allianceCycle.findMany({
                orderBy: {
                    weekNumber: "desc",
                },
            }),

            prisma.desertStormCycle.findMany({
                include: {
                    sourceAllianceCycle: true,
                },
                orderBy: {
                    cycleNumber: "desc",
                },
            }),
        ]);

        return {
            allianceCycles,
            desertStormCycles,
        };
    });
}

export async function POST(request: Request) {
    return adminRoute(async () => {
        const body = await request.json();

        const {
            name,
            sourceAllianceCycleId,
            votingDate,
            votingOpenAt,
            votingCloseAt,
            eventDate,
        } = body;

        if (!sourceAllianceCycleId) {
            badRequest("Alliance Cycle is required.");
        }

        if (
            !votingDate ||
            !votingOpenAt ||
            !votingCloseAt ||
            !eventDate
        ) {
            badRequest("All Desert Storm dates are required.");
        }

        const sourceCycle = await prisma.allianceCycle.findUnique({
            where: {
                id: sourceAllianceCycleId,
            },
        });

        if (!sourceCycle) {
            badRequest("Alliance Cycle not found.");
        }

        const existingCycle = await prisma.desertStormCycle.findUnique({
            where: {
                sourceAllianceCycleId,
            },
        });

        if (existingCycle) {
            badRequest(
                "This Alliance Cycle already has a Desert Storm cycle."
            );
        }

        const lastCycle = await prisma.desertStormCycle.findFirst({
            orderBy: {
                cycleNumber: "desc",
            },
        });

        const cycleNumber = lastCycle
            ? lastCycle.cycleNumber + 1
            : 1;

        const cycle = await prisma.desertStormCycle.create({
            data: {
                cycleNumber,

                name:
                    name?.trim() ||
                    `Desert Storm ${cycleNumber}`,

                sourceAllianceCycleId,

                votingDate: new Date(votingDate),
                votingOpenAt: new Date(votingOpenAt),
                votingCloseAt: new Date(votingCloseAt),
                eventDate: new Date(eventDate),
            },

            include: {
                sourceAllianceCycle: true,
            },
        });

        return {
            success: true,
            cycle,
        };
    });
}