import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";

export async function GET() {
  try {
    const currentUser = await getCurrentUser();

    if (
      !currentUser ||
      !["OWNER", "R5", "R4"].includes(currentUser.role)
    ) {
      return NextResponse.json(
        { error: "Unauthorized." },
        { status: 403 }
      );
    }

    const users = await prisma.user.findMany({
      where: {
        approved: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        playerId: true,
        inGameName: true,
        role: true,
        approved: true,
        createdAt: true,
      },
    });

    return NextResponse.json(users);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}