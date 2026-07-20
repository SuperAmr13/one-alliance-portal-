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

    const { id } = await req.json();

    if (!id) {
      badRequest("User ID is required.");
    }

    const targetUser = await prisma.user.findUnique({
      where: { id },
    });

    if (!targetUser) {
      notFound("User not found.");
    }

    // لا يمكن حذف نفسك
    if (targetUser.id === currentUser.id) {
      forbidden("You can't delete your own account.");
    }

    // R5 لا يمكنه حذف OWNER أو R5
    if (
      currentUser.role === "R5" &&
      (targetUser.role === "OWNER" || targetUser.role === "R5")
    ) {
      forbidden("You can't delete this user.");
    }

    await prisma.user.delete({
      where: {
        id,
      },
    });

    return {
      success: true,
    };
  });
}