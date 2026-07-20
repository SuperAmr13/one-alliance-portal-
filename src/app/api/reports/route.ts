import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized." },
        { status: 401 }
      );
    }

    const currentCycle = await prisma.allianceCycle.findFirst({
      where: {
        isCurrent: true,
      },
    });

    if (!currentCycle) {
      return NextResponse.json(
        { error: "No active alliance cycle found." },
        { status: 404 }
      );
    }

    if (!currentCycle.isOpen) {
      return NextResponse.json(
        { error: "Report submission is currently closed." },
        { status: 400 }
      );
    }

    const body = await req.json();

    const exists = await prisma.report.findUnique({
      where: {
        userId_cycleId: {
          userId: user.id,
          cycleId: currentCycle.id,
        },
      },
    });

    if (exists) {
      return NextResponse.json(
        {
          error: "You have already submitted a report for the current cycle.",
        },
        { status: 400 }
      );
    }

    const report = await prisma.report.create({
      data: {
        userId: user.id,
        cycleId: currentCycle.id,
        heroPower: BigInt(body.heroPower),
        firstSquadPower: BigInt(body.firstSquadPower),
        firstSquadType: body.firstSquadType,
        heroPowerImage: body.heroImagePath,
        wallImage: body.wallImagePath,
      },
    });

    return NextResponse.json(report);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Internal server error.",
      },
      { status: 500 }
    );
  }
}