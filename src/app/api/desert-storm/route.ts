import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";

export async function GET() {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized." },
        { status: 401 }
      );
    }

    const cycle = await prisma.desertStormCycle.findFirst({
      where: {
        status: {
          not: "COMPLETED",
        },
      },
      orderBy: {
        eventDate: "asc",
      },
    });

    if (!cycle) {
      return NextResponse.json({
        cycle: null,
        participant: null,
      });
    }

    const participant =
      await prisma.desertStormParticipant.findUnique({
        where: {
          cycleId_userId: {
            cycleId: cycle.id,
            userId: user.id,
          },
        },
        select: {
          vote: true,
        },
      });

    return NextResponse.json({
      cycle: {
        id: cycle.id,
        cycleNumber: cycle.cycleNumber,
        name: cycle.name,
        votingDate: cycle.votingDate,
        votingOpenAt: cycle.votingOpenAt,
        votingCloseAt: cycle.votingCloseAt,
        eventDate: cycle.eventDate,
        status: cycle.status,
        mapPublished: cycle.mapPublished,
      },
      participant,
    });
  } catch (error) {
    console.error("GET /api/desert-storm error:", error);

    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
