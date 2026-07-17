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

                                              if (!["OWNER", "R5", "R4"].includes(currentUser.role)) {
                                                    return NextResponse.json(
                                                            { error: "You don't have permission." },
                                                                    { status: 403 }
                                                                          );
                                                                              }

                                                                                  const { id, inGameName } = await req.json();

                                                                                      if (!id || !inGameName) {
                                                                                            return NextResponse.json(
                                                                                                    { error: "Missing data." },
                                                                                                            { status: 400 }
                                                                                                                  );
                                                                                                                      }

                                                                                                                          const user = await prisma.user.update({
                                                                                                                                where: {
                                                                                                                                        id,
                                                                                                                                              },
                                                                                                                                                    data: {
                                                                                                                                                            inGameName,
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