import { prisma } from "@/lib/prisma";
import { adminRoute, forbidden } from "@/lib/api";

export async function GET() {
  return adminRoute(async (currentUser) => {
    if (!["OWNER", "R5", "R4"].includes(currentUser.role)) {
      forbidden("Unauthorized.");
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

    return users;
  });
}