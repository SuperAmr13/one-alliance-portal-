import { prisma } from "@/lib/prisma";
import { adminRoute, forbidden } from "@/lib/api";

export async function GET() {
  return adminRoute(async (currentUser) => {
    if (!["OWNER", "R5", "R4"].includes(currentUser.role)) {
      forbidden("You don't have permission.");
    }

    const users = await prisma.user.findMany({
      where: {
        approved: false,
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        playerId: true,
        inGameName: true,
        role: true,
        createdAt: true,
      },
    });

    return users;
  });
}