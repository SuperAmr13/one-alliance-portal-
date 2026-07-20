import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  adminRoute,
  badRequest,
  forbidden,
} from "@/lib/api";

export async function POST(req: NextRequest) {
  return adminRoute(async (currentUser) => {
    if (!["OWNER", "R5", "R4"].includes(currentUser.role)) {
      forbidden("You don't have permission.");
    }

    const { id, inGameName } = await req.json();

    if (!id || !inGameName) {
      badRequest("Missing data.");
    }

    const user = await prisma.user.update({
      where: {
        id,
      },
      data: {
        inGameName,
      },
      select: {
        id: true,
        playerId: true,
        inGameName: true,
        role: true,
      },
    });

    return {
      success: true,
      user,
    };
  });
}