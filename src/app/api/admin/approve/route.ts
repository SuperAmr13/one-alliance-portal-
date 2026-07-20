import { prisma } from "@/lib/prisma";
import { adminRoute, badRequest } from "@/lib/api";

export async function POST(req: Request) {
  return adminRoute(async () => {
    const { id } = await req.json();

    if (!id) {
      badRequest("User ID is required.");
    }

    await prisma.user.update({
      where: { id },
      data: {
        approved: true,
      },
    });

    return {
      success: true,
    };
  });
}