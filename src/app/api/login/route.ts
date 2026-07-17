import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import {
  generateSessionToken,
  getSessionExpiry,
} from "@/lib/session";

export async function POST(req: Request) {
  try {
    const { playerId, password } = await req.json();

    if (!playerId || !password) {
      return NextResponse.json(
        { error: "Player ID and password are required." },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        playerId,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid Player ID or password." },
        { status: 401 }
      );
    }

    if (!user.approved) {
      return NextResponse.json(
        { error: "Your account is waiting for approval." },
        { status: 403 }
      );
    }

    const validPassword = await bcrypt.compare(
      password,
      user.passwordHash
    );

    if (!validPassword) {
      return NextResponse.json(
        { error: "Invalid Player ID or password." },
        { status: 401 }
      );
    }

    const token = generateSessionToken();
    const expiresAt = getSessionExpiry();

    await prisma.session.create({
      data: {
        token,
        userId: user.id,
        expiresAt,
      },
    });

    const cookieStore = await cookies();

    cookieStore.set("session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      expires: expiresAt,
    });

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        playerId: user.playerId,
        inGameName: user.inGameName,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}