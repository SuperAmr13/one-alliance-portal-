import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { playerId, ingameName, password } = body;

    if (!playerId || !ingameName || !password) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        playerId,
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Player ID already exists." },
        { status: 400 }
      );
    }

    const passwordHash = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        playerId,
        inGameName: ingameName,
        passwordHash,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Registration request submitted.",
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}