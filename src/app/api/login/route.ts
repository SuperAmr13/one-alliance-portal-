import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

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