import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";

export async function POST(req: NextRequest) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json(
        { error: "Unauthorized." },
        { status: 401 }
      );
    }

    if (!["OWNER", "R5"].includes(currentUser.role)) {
      return NextResponse.json(
        { error: "You don't have permission." },
        { status: 403 }
      );
    }

    const { id, role } = await req.json();

    if (!id || !role) {
      return NextResponse.json(
        { error: "Missing data." },
        { status: 400 }
      );
    }

    const allowedRoles = ["MEMBER", "R4", "R5", "OWNER"];

    if (!allowedRoles.includes(role)) {
      return NextResponse.json(
        { error: "Invalid role." },
        { status: 400 }
      );
    }

    const targetUser = await prisma.user.findUnique({
      where: { id },
    });

    if (!targetUser) {
      return NextResponse.json(
        { error: "User not found." },
        { status: 404 }
      );
    }

    // لا يسمح بتغيير رتبتك بنفسك
    if (targetUser.id === currentUser.id) {
      return NextResponse.json(
        { error: "You can't change your own role." },
        { status: 403 }
      );
    }

    // R5 لا يستطيع إدارة OWNER أو R5
    if (currentUser.role === "R5") {
      if (
        targetUser.role === "OWNER" ||
        targetUser.role === "R5"
      ) {
        return NextResponse.json(
          { error: "You can't manage this user." },
          { status: 403 }
        );
      }

      if (!["MEMBER", "R4"].includes(role)) {
        return NextResponse.json(
          { error: "R5 can only assign MEMBER or R4." },
          { status: 403 }
        );
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

    return NextResponse.json({
      success: true,
      user,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}