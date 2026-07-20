import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  adminRoute,
  badRequest,
  forbidden,
} from "@/lib/api";

export async function GET() {
  return adminRoute(async (currentUser) => {
    if (!["OWNER", "R5", "R4"].includes(currentUser.role)) {
      forbidden("You don't have permission.");
    }

    const news = await prisma.news.findMany({
      include: {
        author: {
          select: {
            id: true,
            inGameName: true,
            role: true,
          },
        },
      },
      orderBy: [
        {
          pinned: "desc",
        },
        {
          createdAt: "desc",
        },
      ],
    });

    return news;
  });
}

export async function POST(req: NextRequest) {
  return adminRoute(async (currentUser) => {
    if (!["OWNER", "R5", "R4"].includes(currentUser.role)) {
      forbidden("You don't have permission.");
    }

    const { title, content, pinned } = await req.json();

    if (!title || !content) {
      badRequest("Missing required fields.");
    }

    const news = await prisma.news.create({
      data: {
        title,
        content,
        pinned: pinned ?? false,
        authorId: currentUser.id,
      },
    });

    return news;
  });
}