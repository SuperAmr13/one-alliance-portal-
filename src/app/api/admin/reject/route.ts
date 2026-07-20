import { prisma } from "@/lib/prisma";
import {
  adminRoute,
  badRequest,
  forbidden,
} from "@/lib/api";

export async function POST(req: Request) {
  return adminRoute(async (currentUser) => {
    if (!["OWNER", "R5", "R4"].includes(currentUser.role)) {
      forbidden("You don't have permission.");
    }

    const { id } = await req.json();

    if (!id) {
      badRequest("User ID is required.");
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