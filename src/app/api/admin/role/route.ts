import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  adminRoute,
  badRequest,
  forbidden,
  notFound,
} from "@/lib/api";

export async function POST(req: NextRequest) {
  return adminRoute(async (currentUser) => {
    if (!["OWNER", "R5"].includes(currentUser.role)) {
      forbidden("You don't have permission.");
    }

    const { id, role } = await req.json();

    if (!id || !role) {
      badRequest("Missing data.");
    }

    const allowedRoles = ["MEMBER", "R4", "R5", "OWNER"];

    if (!allowedRoles.includes(role)) {
      badRequest("Invalid role.");
    }

    const targetUser = await prisma.user.findUnique({
      where: { id },
    });

    if (!targetUser) {
      notFound("User not found.");
    }

    // لا يسمح بتغيير رتبتك بنفسك
    if (targetUser.id === currentUser.id) {
      forbidden("You can't change your own role.");
    }

    // R5 لا يستطيع إدارة OWNER أو R5
    if (currentUser.role === "R5") {
      if (
        targetUser.role === "OWNER" ||
        targetUser.role === "R5"
      ) {
        forbidden("You can't manage this user.");
      }

      if (!["MEMBER", "R4"].includes(role)) {
        forbidden("R5 can only assign MEMBER or R4.");
      }
    }

    const user = await prisma.user.update({
      where: {
        id,
      },
      data: {
        role,
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