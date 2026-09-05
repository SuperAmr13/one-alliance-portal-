import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized." },
        { status: 401 }
      );
    }

    const body = await request.json();
    const vote = body?.vote;

    if (vote !== "YES" && vote !== "NO") {
      return NextResponse.json(
        { error: "Invalid vote." },
        { status: 400 }
      );
    }

    const now = new Date();

    const cycle = await prisma.desertStormCycle.findFirst({
      where: {
        votingOpenAt: {
          lte: now,
        },
        votingCloseAt: {
          gte: now,
        },
        status: "VOTING",
      },
      orderBy: {
        votingOpenAt: "desc",
      },
    });

    if (!cycle) {
      return NextResponse.json(
        { error: "Voting is currently closed." },
        { status: 400 }
      );
    }

    const existingParticipant =
      await prisma.desertStormParticipant.findUnique({
        where: {
          cycleId_userId: {
            cycleId: cycle.id,
            userId: user.id,
          },
        },
        select: {
          id: true,
          vote: true,
        },
      });

    if (existingParticipant?.vote) {
      return NextResponse.json(
        {
          error: "You have already voted for this Desert Storm cycle.",
        },
        { status: 400 }
      );
    }

    const participant =
      existingParticipant ??
      (await prisma.desertStormParticipant.create({
        data: {
          cycleId: cycle.id,
          userId: user.id,
          vote,
        },
        select: {
          id: true,
          vote: true,
        },
      }));

    return NextResponse.json({
      success: true,
      participant,
    });
  } catch (error) {
    console.error("POST /api/desert-storm/vote error:", error);

    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
