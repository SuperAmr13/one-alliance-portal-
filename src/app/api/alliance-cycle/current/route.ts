import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const cycle = await prisma.allianceCycle.findFirst({
      where: {
        isCurrent: true,
      },
    });

    if (!cycle) {
      return NextResponse.json(
        { error: "No active alliance cycle found." },
        { status: 404 }
      );
    }

    return NextResponse.json(cycle);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}